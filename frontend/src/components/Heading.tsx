export default function Heading({
  text,
  subText,
  to,
}: {
  text: string;
  subText: string;
  to: string;
}) {
  let logOrSign = to == "./signup" ? "Sign Up" : "Log In";
  return (
    <div className="flex flex-col md:w-1/2 w-4/5 items-center">
      <div className="text-4xl font-bold">{text}</div>
      <div className="text-md font-reguler text-gray-500">
        {subText}&nbsp;
        <a className="underline" href={to}>
          {logOrSign}
        </a>
      </div>
    </div>
  );
}
