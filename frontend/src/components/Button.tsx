export default function Button({text, onClick}:{width:string, text:string, onClick:()=>void}){
    return <div className="md:w-1/2 w-4/5">
        <button className="w-full bg-black text-white rounded-md p-2 mt-5" onClick={onClick}>{text}</button>
    </div>
}