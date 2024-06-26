import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import URL from "../config";

export default function Blog() {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: { name: "" },
  });
  const navigate = useNavigate();

  function onClick() {
    navigate("/editBlog");
  }

  useEffect(() => {
    if (id) {
      axios
        .get(URL+"/api/v1/blog/post/" + id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setPost(res.data.post);
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
        });
    }
  }, [id]);

  return (
    <div>
      <AppBar onSite={"blog"} onClick={onClick} />
      <div className="flex flex-row">
        <div className="md:w-3/5 w-4/5 flex flex-col pl-10 pt-10">
          <div className="text-3xl font-bold">{post.title}</div>
          <div className="text-sm mt-2 text-justify">{post.content}</div>
        </div>
        <div className="md:flex flex-col mt-12 ml-8 hidden">
          <div className="text-sm">Author</div>
          <div className="flex flex-row mt-3 items-center">
            <div className="h-6 w-6 bg-gray-300 rounded-full justify-center flex items-center text-xs">
              {post.author.name[0]}
            </div>
            <div className="text-lg font-bold pl-2">{post.author.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
