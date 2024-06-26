import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import BlogComponent from "../components/BlogComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import URL from "../config";

export default function Blogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([{
    title:"",
    id:"",
    content:"",
    author:{name:""}
  }]);
  const navigate = useNavigate();

  function onClick() {
    navigate("/editBlog");
  }

  useEffect(() => {
    axios
      .get(URL + "/api/v1/blog/bulk", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      <AppBar onSite={"blog"} onClick={onClick} />
      {loading ? <Loading /> : (
        <div className="w-full flex flex-col items-center mt-4">
          {blogs.map((elem) => (
            <BlogComponent
              key={elem.id}
              id={elem.id}
              title={elem.title}
              content={elem.content}
              author={elem.author.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
    <div>
      {[...Array(7)].map((_, index) => (
        <div key={index} className="mt-4 rounded-md p-4 w-4/5 mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
