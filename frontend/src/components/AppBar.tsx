import { useNavigate } from "react-router-dom";


export default function AppBar({onSite, onClick}:{onSite:string, onClick?:()=>void}) {
    const navigate = useNavigate();
    const name="Anubhav";

  return (
    <div className="border-b-2 flex flex-row w-full justify-between p-4 pl-10 items-center">
      <div className="text-xl font-bold hover:cursor-pointer" onClick={e=>{navigate('/blogs')}}>Medium</div>
      <div className="flex flex-row items-center">
        <div className="mr-3">
          <button
            className={`bg-green-600 rounded-md px-3 py-1 text-sm text-white`}
            onClick={onClick}
          >
            {onSite=="editBlog"?"Publish":"Write"}
          </button>
        </div>
        <div className="w-8 h-8 flex justify-center items-center bg-gray-300 rounded-full text-sm">
          {name[0]}
        </div>
      </div>
    </div>
  );
}
