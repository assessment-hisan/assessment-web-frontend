import ProfileInfo from "./Cards/ProfileInfo"

const Navbar = ({userInfo}) => {
  // const [searchQuery, setSearchQuery] = useState("")

  // const handleSearch = () => {}
  // const onClearSearch = () => {
  //   setSearchQuery("")
  // }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Hisan</h2>
     {userInfo && ( <ProfileInfo userInfo={userInfo}/>)   }
    </div>
  )
}

export default Navbar
