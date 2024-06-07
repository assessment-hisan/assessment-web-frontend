import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircle  } from "react-icons/io5";
import moment from "moment";

const NoteCard = ({
  userInfo,
  userName,
  title,
  date,
  content,
  tags,
  imageUrls,
  isPinned,
  isValuated,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 md:mx-0 mx-5 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
        {userInfo?.isAdmin && <h3>{userName}</h3>}
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        {/* <MdOutlinePushPin
        className={`icon-btn ${isPinned ? 'text-primary' : "text-slate-300"}`}
        onClick={onPinNote}/> */}
        {isValuated && <IoCheckmarkDoneCircle   className="text-green-700 text-2xl"/>}
      </div>

      <p className="text-xs text-slate-500 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((tag) => tag)}
        </div>

        <div className="flex items-center gap-2">
        
          <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
          {!userInfo?.isAdmin && (
            <MdDelete
              className="icon-btn hover:text-red-500"
              onClick={onDelete}
            />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
