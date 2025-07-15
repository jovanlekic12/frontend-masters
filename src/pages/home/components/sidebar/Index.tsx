import { useEffect, useState } from "react";
import { fetchFilters, fetchRoadmapCounts } from "../../../../api/product-reqs";
import Loader from "../../../../components/Loader";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useNavigate, useSearchParams } from "react-router";
import Button from "../../../../components/ui/Button";
import type { Roadmap } from "../../../../utils/types";

export default function SideBar() {
  const { data: filters, isLoading } = useFetchData(fetchFilters);
  const [activeBtn, setActiveBtn] = useState<string>("all");
  const [roadMap, setRoadmap] = useState<Roadmap[]>([]);
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

  const { data: roadmap } = useFetchData(fetchRoadmapCounts);

  return (
    <aside className="flex flex-col items-center">
      <div className="text-white text-2xl font-semibold bg-linear-to-r/srgb from-indigo-500 to-teal-400 px-12 py-18 rounded-2xl ">
        Feedback Board
      </div>
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 gap-2 my-10">
        {filters?.map((filter) => {
          return (
            <Button onClick={() => handleFilterChange(filter)} type="secondary">
              {filter}
            </Button>
          );
        })}
      </div>
      <div className="w-8/12">
        <div className="flex items-center justify-between">
          <h6 className="font-semibold">Roadmap</h6>
          <a className="text-blue-600 hover:underline cursor-pointer">View</a>
        </div>
        <ul className="flex flex-col list-none gap-1 mt-5">
          {roadmap &&
            roadmap.map((item) => {
              return (
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-2xl">•</span>
                    <span className="text-lg capitalize">{item.status}</span>
                  </div>
                  <span className="font-bold text-lg">{item.count}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
}
