import { useNavigate } from "react-router-dom";

export default function BlogComponent({
    id,
  title,
  content,
  author,
}: {
    id:string;
  title: string;
  content: string;
  author: string;
}) {
    const navigate=useNavigate();
  return (
    <div className="w-4/5 p-5 border-b-2" onClick={(e)=>{navigate('/blog/'+id)}}>
      <div className="flex flex-row w-full items-center">
        <div className="w-5 h-5 bg-gray-300 flex items-center justify-center rounded-full text-xs mr-1">{author[0]}</div>
        <div className="text-sm font-regular">{author}</div>
      </div>
      <div className="text-xl font-bold">{title}</div>
      <div className="text-md">{content.length>100? content.slice(0,100)+"...":content}</div>
      <div className="text-sm text-gray-500 mt-4">{Math.ceil(content.length / 100)} min read</div>
    </div>
  );
}
