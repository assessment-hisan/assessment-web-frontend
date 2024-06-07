import { storage } from "../../main";

const FileInput = async(file) => {
    const uploadFile = () => {
        const storageRef = storage().ref();
        const fileRef = storageRef.child('path/to/your/file.pdf');

        fileRef.put(file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        fileRef.getDownloadURL().then((url) => {
            console.log('File available at', url);
          });
          
    }
    const handleFileChange = async(e) => {
        
    }
  return (
    <div>
      
      <input type="file" multiple accept=".pdf" onChange={handleFileChange} />
     

    </div>
  )
}

export default FileInput
