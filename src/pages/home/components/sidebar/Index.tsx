import { useState } from "react";
import { fetchFilters } from "../../../../api/product-reqs";
import Loader from "../../../../components/Loader";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useNavigate, useSearchParams } from "react-router";

export default function SideBar() {
  const { data: filters, isLoading } = useFetchData(fetchFilters);
  const [activeBtn, setActiveBtn] = useState<string>("all");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleFilterChange = (filter: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (filter) {
      newParams.set("category", filter);
    } else {
      newParams.delete("category");
    }
    navigate({ search: newParams.toString() });
  };

  return (
    <aside className="flex flex-col items-center">
      <div className="text-white text-2xl font-semibold bg-linear-to-r/srgb from-indigo-500 to-teal-400 px-12 py-18 rounded-2xl ">
        Feedback Board
      </div>
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 gap-2 my-10">
        {filters?.map((filter) => {
          return (
            <button
              onClick={() => handleFilterChange(filter)}
              className="capitalize bg-white text-blue-600 rounded-xl py-1 px-4 font-semibold hover:bg-blue-200 cursor-pointer duration-200"
            >
              {filter}
            </button>
          );
        })}
      </div>
      <div className="w-8/12">
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
