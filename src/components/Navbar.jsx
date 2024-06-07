import ProfileInfo from "./Cards/ProfileInfo"
import SearchBar from "./SearchBar/SearchBar"



const Navbar = ({userInfo}) => {
  // const [searchQuery, setSearchQuery] = useState("")

  // const handleSearch = () => {}
  // const onClearSearch = () => {
  //   setSearchQuery("")
  // }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">example</h2>

      {/* <SearchBar
      value={searchQuery}
      onChange={({target}) => {
        setSearchQuery(target.value)
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      /> */}
      
     {userInfo && ( <ProfileInfo userInfo={userInfo}/>)   }
    </div>
  )
}

export default Navbar
