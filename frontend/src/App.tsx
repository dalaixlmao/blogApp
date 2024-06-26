import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import EditBlog from "./pages/EditBlog";
function App() {
  // const navigate = useNavigate();
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <div className="h-full w-full flex md:flex-row flex-col">
                <a href={"/signup"} className="flex justify-center items-center md:w-1/2 w-full md:h-full h-1/2 hover:bg-gray-700 hover:text-white text-7xl font-light">Sign up </a>
                <a href={"/signin"} className="flex justify-center items-center md:w-1/2 w-full md:h-full h-1/2 hover:bg-gray-700 hover:text-white text-7xl font-light">Sign in </a>
              </div>
            }
          ></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route path={"/blog/:id"} element={<Blog />}></Route>
          <Route path={"/blogs"} element={<Blogs/>}></Route>
          <Route path={"/editBlog"} element ={<EditBlog/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
