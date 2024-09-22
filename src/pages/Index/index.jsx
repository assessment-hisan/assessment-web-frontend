import { Link } from "react-router-dom"

const Index = () => {
  return (
    <>
    <div className="bg-gray-300 flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Hisan </h2>

      <div className="flex bg-blue-600 px-5 py-2 rounded-lg text-white hover:bg-blue-800">
    <Link to="/login">
        Login
    </Link>
  </div>

    </div>
    <div className="flex flex-col items-center justify-center mt-16 ">
      <div className="">
      <img src="../../../logo copy.png" className="w-[30rem]"alt="Hisan Image"/>
      </div>
      
    </div>
   
    </>
  )
}

export default Index
