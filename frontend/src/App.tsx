import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import EditBlog from "./pages/EditBlog";
import Landing from "./pages/Landing";
function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Landing />}></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route path={"/blog/:id"} element={<Blog />}></Route>
          <Route path={"/blogs"} element={<Blogs />}></Route>
          <Route path={"/editBlog"} element={<EditBlog />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
