import { fetchRoadmapCounts } from "@/api/product-reqs";
import { Roadmap } from "@/utils/types";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function Filters() {
  const [filters, setFilters] = useState<Roadmap[] | null>(null);
  const [activeBtn, setActiveBtn] = useState(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getFilters = async () => {
      const newParams = new URLSearchParams(params.toString());
      try {
        const result = await fetchRoadmapCounts();
        setFilters(result);
        setActiveBtn(result[0].status);
        newParams.set("status", result[0].status);
        navigate({ search: newParams.toString() });
      } catch (err) {
        console.error(err);
      }
    };
    getFilters();
  }, []);

  const handleFilterChange = (filter: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (filter) {
      newParams.set("status", filter);
    } else {
      newParams.delete("status");
    }
    navigate({ search: newParams.toString() });
    setActiveBtn(filter);
  };

  return (
    <div className="flex flex-col sm:flex-row xl:items-center w-full xl:justify-evenly">
      {filters &&
        filters.map((filter) => {
          return (
            <button
              key={filter.status}
              onClick={() => handleFilterChange(filter.status)}
              className={`bg-white ${
                activeBtn === filter.status &&
                "shadow-[inset_0_-5px_0_0_rgba(168,85,247,1)]"
              } uppercase w-full py-3 font-semibold text-gray-700 text-lg cursor-pointer duration-200`}
            >
              {filter.status}
              {` (${filter.count})`}
            </button>
          );
        })}
    </div>
  );
}
