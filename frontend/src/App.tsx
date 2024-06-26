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
              <div>
                <a href={"/signup"}>signup </a>
                <a href={"/signin"}>signin </a>
                <a href={"/blog"}>blog </a>
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
