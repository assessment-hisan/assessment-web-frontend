import { MdAdd, MdClose } from "react-icons/md"
import { useState } from "react"

const TagInput = ({tags , setTags, type}) => {
    const [inputValue, setInputValue] = useState("")
   
    const handleInputChage = (e) => {
        setInputValue(e.target.value)
    }

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue("")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag()
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }
  return (
    <div>

        {tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-2">
                {tags.map((tag, index)=> (
                    <span key={index} className="bg-slate-200 rounded px-2 py-1 flex items-center justify-center gap-1" >
                        {tag}
                        <button onClick={()=> {
                            handleRemoveTag(tag)
                        }}>
                            <MdClose/>
                        </button>
                    </span>
                ))}
            </div>
        )}

      {type === "add" && <div className="flex items-center gap-4 mt-3">
        <input 
            type="text"
            value={inputValue}
            className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
            placeholder="Add Tags"
            onChange={handleInputChage}
            onKeyDown={handleKeyDown}
              />

        <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700">
            <MdAdd className="text-2xl text-blue-700 hover:text-white"
            onClick={()=> {
                addNewTag()
            }}
            />
        </button>
      </div>}
    </div>
  )
}

export default TagInput
