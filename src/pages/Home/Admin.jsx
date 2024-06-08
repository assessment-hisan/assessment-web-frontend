import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNote from "./AddEditNote";
import Modal from 'react-modal';
import Datepicker from "react-tailwindcss-datepicker";

const Admin = () => {
  const navigate = useNavigate();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });
  const [notes, setNotes] = useState({
    valuated: [],
    nonValuated: []
  });
  const [filteredNotes, setFilteredNotes] = useState({
    valuated: [],
    nonValuated: []
  });
  const [userInfo, setUserInfo] = useState(null);
  const [options, setOptions] = useState([]);
  const [categories] = useState([
    "category-1", "category-2", "category-3", "category-4"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showValuated, setShowValuated] = useState(false);
  const [dateValue, setDateValue] = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
  });

  const handleDateValueChange = (newValue) => {
    console.log("newDateValue:", newValue); 
    setDateValue(newValue); 
    filterNotes(selectedCategory, notes, newValue);
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data) {
        console.log("User Info:", response.data);
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-admin-notes");
      if (response.data && response.data.notes) {
        const valuated = response.data.notes.filter(note => note.valuated);
        const nonValuated = response.data.notes.filter(note => !note.valuated);
        setNotes({ valuated, nonValuated });
        filterNotes(selectedCategory, { valuated, nonValuated }, dateValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/get-all-users");
      if (response.data && response.data.users) {
        console.log("Users fetched:", response.data.users);
        const nonAdminUsers = response.data.users.filter(user => !user.isAdmin);
        setOptions(nonAdminUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchNotesByUser = async (userId) => {
    try {
      const response = await axiosInstance.get("/search-notes", { params: { query: userId } });
      if (response.data.notes) {
        const valuated = response.data.notes.filter(note => note.valuated);
        const nonValuated = response.data.notes.filter(note => !note.valuated);
        setNotes({ valuated, nonValuated });
        filterNotes(selectedCategory, { valuated, nonValuated }, dateValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    onSearchNotesByUser(userId);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterNotes(category, notes, dateValue);
  };

  const filterNotesByDate = (notesToFilter, dateRange) => {
    const { startDate, endDate } = dateRange;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const filterByDate = (note) => {
      const noteDate = new Date(note.createdOn).getTime();
      return noteDate >= start && noteDate <= end;
    };
    return {
      valuated: notesToFilter.valuated.filter(filterByDate),
      nonValuated: notesToFilter.nonValuated.filter(filterByDate)
    };
  };

  const filterNotes = (category, notesToFilter, dateRange) => {
    let filtered = notesToFilter;
    if (category) {
      filtered = {
        valuated: notesToFilter.valuated.filter(note => note.category === category),
        nonValuated: notesToFilter.nonValuated.filter(note => note.category === category)
      };
    }
    const filteredByDate = filterNotesByDate(filtered, dateRange);
    setFilteredNotes(filteredByDate);
  };

  const valuateNote = async (data) => {
    try {
      if (!data || !data._id) {
        console.error("Note data is missing or invalid");
        return;
      }
      console.log(data)
      const response = await axiosInstance.put(`/valuate-note/${data._id}`);
  
      if (response.status === 200) {
        console.log("Note successfully valuated");
        await getAllNotes(); // Refresh notes
        // Retain filters
        filterNotes(selectedCategory, notes, dateValue);
        setOpenAddEditModal({ isShown: false, type: "add", data: null }); // Close modal
      }
    } catch (error) {
      console.error("Error valuating note:", error);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    getAllUsers();
  }, []);

  const toggleValuated = (value) => {
    setShowValuated(value);
  };

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto mt-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
          <div className="max-w-sm w-full">
            <div className="relative">
              <select
                onChange={handleUserChange}
                defaultValue=""
                className="bg-white border border-gray-300 text-sm rounded-lg block w-full p-3 text-slate-900"
              >
                <option value=""  >
                  Select a user
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option._id}>
                    {option.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="max-w-sm w-full">
            <div className="relative">
              <select
                onChange={handleCategoryChange}
                defaultValue=""
                className="bg-white border border-gray-300 text-sm rounded-lg block w-full p-3 text-slate-900"
              >
                <option value="" >
                  Select a category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Datepicker 
            value={dateValue} 
            onChange={handleDateValueChange} 
            readOnly={true}
          /> 

          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              className={`px-4 py-2 rounded ${!showValuated ? 'bg-blue-500' : 'bg-gray-300'} text-white min-w-28`}
              onClick={() => toggleValuated(false)}
            >
              To Be
            </button>
            <button
              className={`px-4 py-2 rounded ${showValuated ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
              onClick={() => toggleValuated(true)}
            >
              Valuated
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8">
          {(showValuated ? filteredNotes.valuated : filteredNotes.nonValuated).map((item) => (
            <NoteCard
              userInfo={userInfo}
              userName={item.userName}
              key={item._id}
              title={item.title}
              date={item.date}
              content={item.content}
              tags={item.tags}
              imageUrls={item.imageUrls}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            overflow: "auto"
          }
        }}
        contentLabel=""
        className="md:w-[40%] w-[85%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 mb-5"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          userInfo={userInfo}
        />
        <section className="flex justify-center items-center mt-4">
          {openAddEditModal.data?.valuated ? (
            <div className="w-full px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded">
              This note has been valuated.
            </div>
          ) : (
            <button
              className="w-full px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => valuateNote(openAddEditModal.data)}
            >
              Valuate Note
            </button>
          )}
        </section>
      </Modal>
    </>
  );
};

export default Admin;
