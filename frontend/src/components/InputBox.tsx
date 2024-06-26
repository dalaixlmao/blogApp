import { SetStateAction, Dispatch } from "react";
export default function InputBox({
  type,
  placeholder,
  setFunction,
}: {
  type: string;
  placeholder: string;
  setFunction: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="md:w-1/2 w-4/5 flex flex-col mt-5">
      <div className="text-lg font-medium ">{placeholder[0].toUpperCase() + placeholder.slice(1)}</div>

        <input
        className="border border-2 rounded-md p-2 pl-3 mt-1"
          placeholder={"Enter your " + placeholder}
          type={type}
          onChange={(e) => {
            setFunction(e.target.value);
          }}
        />
    </div>
  );
}
