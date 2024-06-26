export default function RightSection({
  quote,
  author,
  designation,
}: {
  quote: string;
  author: string;
  designation: string;
}) {
  return (
    <div className="flex flex-col justify-center w-3/5">
      <div className="text-2xl font-bold">"{quote}"</div>
      <div className="font-bold text-lg pt-2">{author}</div>
      <div className="text-gray-500 font-medium">{designation}</div>
    </div>
  );
}
