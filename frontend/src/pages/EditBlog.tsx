import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import { useState } from "react";
import axios from "axios";
import URL from "../config";
export default function EditBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  function onClick() {
    axios.post(
      URL+"/api/v1/blog",
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization:
          localStorage.getItem("token"),
        },
      }
    ).then(res=>{
        navigate("/blog/"+res.data.post.id);
    });
  }
  return (
    <div className="h-full">
      <AppBar onSite={"editBlog"} onClick={onClick} />
      <div className="flex w-full md:justify-center h-4/5">
        <div className="flex flex-col h-full md:pl-0 pl-3 w-4/5 md:w-3/5">
          <input
            className="text-3xl mt-10 focus:outline-none"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            className="mt-3 focus:outline-none h-full"
            placeholder="Tell your story..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
