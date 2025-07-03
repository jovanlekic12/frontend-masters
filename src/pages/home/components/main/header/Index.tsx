import { MdOutlineLightbulb } from "react-icons/md";

export default function Header() {
  return (
    <header className=" rounded bg-blue-400 flex items-center justify-between py-3 px-5 text-white ">
      <div className="flex items-center gap-2.5">
        <MdOutlineLightbulb className="text-x text-2xl" />
        <h4 className="text-xl font-medium">Suggestions</h4>
        <div className="flex items-center gap-2.5">
          <h4 className="text-xl font-medium">Sort by:</h4>
          <select></select>
        </div>
      </div>
      <button className="text-xl rounded bg-purple-600 py-1 px-3 cursor-pointer">
        Add Feedback
      </button>
    </header>
  );
}
