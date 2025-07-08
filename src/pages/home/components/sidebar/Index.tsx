export default function SideBar() {
  return (
    <aside className="flex flex-col items-center">
      <div className="text-white text-2xl font-semibold bg-linear-to-r/srgb from-indigo-500 to-teal-400 px-12 py-18 rounded-2xl ">
        Feedback Board
      </div>
      <div className="w-8/12 mt-5">
        <div className="flex items-center justify-between">
          <h6 className="font-semibold">Roadmap</h6>
          <a className="text-blue-600">View</a>
        </div>
        <ul className="flex flex-col list-none gap-1 mt-5">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 text-2xl">•</span>
              <span className="text-lg">Live</span>
            </div>
            <span className="font-bold text-lg">5</span>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-2xl">•</span>
              <span className="text-lg">In-Proggres</span>
            </div>
            <span className="font-bold text-lg">5</span>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-2xl">•</span>
              <span className="text-lg">Planned</span>
            </div>
            <span className="font-bold text-lg">5</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
