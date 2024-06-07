import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { storage } from "../../main";

const Dropzone = ({ className, fileUrls, setFileUrls, type }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({ percentage: 0, uploadingCount: 0 });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(prevFiles => [
        ...prevFiles,
        ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*,application/pdf' });

  const removeFile = (name) => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  const uploadFile = async (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`files/${file.name}`);

    return new Promise((resolve, reject) => {
      fileRef.put(file).on(
        'state_changed',
        (snapshot) => {
          const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(prevProgress => ({
            ...prevProgress,
            percentage,
          }));
        },
        (error) => {
          console.error('Error uploading file:', error);
          setError('Error uploading file.');
          setProgress(prevProgress => ({
            ...prevProgress,
            uploadingCount: prevProgress.uploadingCount - 1,
          }));
          reject(error);
        },
        async () => {
          const url = await fileRef.getDownloadURL();
          setFileUrls(prevUrls => [...prevUrls, url]);
          setProgress(prevProgress => ({
            ...prevProgress,
            uploadingCount: prevProgress.uploadingCount - 1,
          }));
          setFiles((prevFiles) => prevFiles.filter(f => f.name !== file.name));
          resolve();
        }
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsUploading(true);
    setProgress(prevProgress => ({
      ...prevProgress,
      uploadingCount: files.length,
    }));
    try {
      for (const file of files) {
        await uploadFile(file);
      }
    } catch (error) {
      setError('Failed to upload some files.');
    } finally {
      setIsUploading(false);
      setProgress({ percentage: 0, uploadingCount: 0 });
    }
  };

  return (
    <>
      {type === "add" && (
        <form onSubmit={handleSubmit} className="mt-3 bg-slate-200 text-center flex flex-col items-center justify-center  p-3 rounded-md drop-shadow">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop files here...</p> : <p>Drag and drop some files here, or click to select files</p>}
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="flex flex-wrap items-center justify-center  gap-3 mt-4 border-t-2 border-black pt-3 ">
            {files.map(file => (
              <div key={file.name} className="">
                {file.type === 'application/pdf' ? (
                  <embed src={file.preview} width={200} height={200} type="application/pdf" />
                ) : (
                  <img
                    src={file.preview}
                    alt={file.name}
                    width={200}
                    height={200}
                    onLoad={() => URL.revokeObjectURL(file.preview)}
                  />
                )}
                <button type="button" className="px-4 py-2 bg-red-500 rounded-md font-medium mt-2" onClick={() => removeFile(file.name)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          {files.length > 0 && (
            <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-4" disabled={isUploading}>
              {isUploading ? `Uploading... ${progress.percentage}% (${progress.uploadingCount} file${progress.uploadingCount > 1 ? 's' : ''})` : 'Upload'}
            </button>
          )}
        </form>
      )}

      {fileUrls.length > 0 && <label className="input-label">UPLOADED FILES</label>}
      <div className="flex flex-wrap items-center justify-start gap-4 mt-3">
        {fileUrls.map((url, index) => (
          <div key={index} className="">
            {url.endsWith('.pdf') ? (
              <embed src={url} width={200} height={200} type="application/pdf" />
            ) : (
              <img src={url} alt={`Uploaded ${index + 1}`} width={200} height={200} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Dropzone;
