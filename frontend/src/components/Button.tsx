import Loader from "./Loader"

export default function Button({text, onClick, loading}:{width:string, text:string, onClick:()=>void, loading:boolean}){
    return <div className="md:w-1/2 w-4/5">
        <button className="w-full bg-black text-white rounded-md flex flex-col items-center justify-center p-2 mt-5" onClick={onClick}>{loading?<Loader />:text}</button>
    </div>
}