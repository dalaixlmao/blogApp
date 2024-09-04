import { useNavigate } from "react-router-dom"

export default function Landing(){
    const navigate = useNavigate();
    if(localStorage.getItem("token"))
        navigate('/blogs')
    return <div className="h-full w-full flex md:flex-row flex-col">
    <a href={"/signup"} className="flex justify-center items-center md:w-1/2 w-full md:h-full h-1/2 hover:bg-gray-700 hover:text-white text-7xl font-light">Sign up </a>
    <a href={"/signin"} className="flex justify-center items-center md:w-1/2 w-full md:h-full h-1/2 hover:bg-gray-700 hover:text-white text-7xl font-light">Sign in </a>
  </div>
}