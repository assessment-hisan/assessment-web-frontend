import React, { useState, useEffect } from 'react';
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from 'react-modal';
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    isShown: false,
    note: null,
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const handleDelete = (note) => {
    setConfirmDeleteModal({ isShown: true, note });
  };

  const confirmDelete = async () => {
    const noteId = confirmDeleteModal.note._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data) {
        getAllNotes();
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        console.log("An error occurred: ", error.response.data.message);
      } else {
        console.log("An error occurred: ", error.message);
      }
    }
    setConfirmDeleteModal({ isShown: false, note: null });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-Notes");
      if (response.data && response.data.notes) {
        console.log(response.data.notes);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8">
          {allNotes.map((item) => (
            <NoteCard
            userInfo={userInfo}
              userName={item.userName}
              key={item._id}
              title={item.title}
              date={item.date} // corrected 'data' to 'date'
              content={item.content}
              tags={item.tags}
              imageUrls={item.imageUrls}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: "add", data: null });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            overflow: "auto",
          },
        }}
        contentLabel=""
        className="md:w-[40%] w-[85%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 mb-5"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          userInfo={userInfo}
        />
      </Modal>

      <Modal
        isOpen={confirmDeleteModal.isShown}
        onRequestClose={() => {
          setConfirmDeleteModal({ isShown: false, note: null });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            overflow: "auto",
          },
        }}
        contentLabel="Delete Confirmation"
        className="md:w-[40%] w-[80%] max-h-3/4 bg-white rounded-md mx-auto mt-[35%] p-5 mb-5"
      >
        <div>
          <h2>Are you sure you want to delete this note?</h2>
          <div className="flex justify-end mt-4">
            <button
              className="mr-4 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setConfirmDeleteModal({ isShown: false, note: null })}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-xl shadow-xl shadow-gray-700 bg-primary hover:bg-blue-600 absolute right-10 bottom-0"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
    </>
  );
};

export default Home;
