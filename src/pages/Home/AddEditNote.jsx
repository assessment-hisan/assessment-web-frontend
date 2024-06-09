import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import moment from "moment";
import Dropzone from "../../components/dropzone/Dropzone";
import { formatISODate } from "../../utils/helper";
const AddEditNote = ({ noteData, type, getAllNotes, onClose, userInfo }) => {
  const [tags, setTags] = useState(noteData?.tags || []);
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [imageUrls, setImageUrls] = useState(noteData?.imageUrls || []);
  const [date, setDate] = useState(noteData?.date || new Date());
  const [category, setCategory] = useState(noteData?.category || "");
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
        imageUrls,
        date,
        category
      });

      if (response.data) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response.data) {
        setError(error.response.data);
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    }
  };

  const editNote = () => {
    // Logic for editing the note (not implemented in the original code)
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please add a Title");
      return;
    }

    if (!content) {
      setError("Please add Content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-full flex flex-col gap-2">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            value={title}
            className="text-xl text-slate-900 outline-none"
            placeholder="Program Name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <MdClose
            size={25}
            className="text-red-600 hover:text-red-800"
            onClick={onClose}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col">
        <label className="input-label mb-2">DATE</label>
        {type === "add" ? (
          <input
            type="date"
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        ) : (
          <h3>{moment(date).format("Do MMM YYYY")}</h3>
        )}
      </div>
          
        {userInfo?.isAdmin && <><p>createdOn</p><input className="w-full" disabled value={ formatISODate(noteData?.createdOn)}/></>}

      <div className="mt-3 flex flex-col">
        <label className="input-label">CATEGORY</label>
       {!userInfo?.isAdmin &&  <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-gray-300 text-sm rounded-lg block w-full p-3 text-slate-900 mt-2"
        >
          <option value="" disabled hidden>
            Select a category
          </option>
          <option value="SRSA">SRSA</option>
          <option value="LSRW">LSRW</option>
          <option value="category-3">Category 3</option>
          <option value="others">others</option>
        </select>}
        {userInfo?.isAdmin && <input className="mt-2" disabled value={category}/>}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          value={content}
          className="text-sm text-slate-950 outline-none text-lg bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={5}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} type={type} />
      </div>
      <div className="mt-3">
        {type === "add" && <label className="input-label">UPLOAD IMAGE</label>}
        <Dropzone
          className="p-9 border border-neutral-200 mt-3"
          fileUrls={imageUrls}
          setFileUrls={setImageUrls}
          type={type}
        />
      </div>

        
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {type === "add" && (
        <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
          Add
        </button>
      )}
    </div>
  );
};

export default AddEditNote;
