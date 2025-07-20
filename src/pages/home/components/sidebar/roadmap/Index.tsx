import { useNavigate, useSearchParams } from "react-router";
import Button from "../../../../../components/ui/Button";
import type { Roadmap } from "../../../../../utils/types";
import { useFetchData } from "../../../../../hooks/useFetchData";
import {
  fetchFilters,
  fetchRoadmapCounts,
} from "../../../../../api/product-reqs";
import { useRef } from "react";
import { useClickSidebar } from "../../../../../hooks/useClickOutside";

type Props = {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
};

export default function SidebarRoadmap({ isOpened, setIsOpened }: Props) {
  const { isLoading, data } = useFetchData(
    { handler: fetchFilters },
    { handler: fetchRoadmapCounts }
  );

  const ref = useRef<HTMLDivElement>(null);

  useClickSidebar(ref, () => setIsOpened(false), isOpened);

  const filters = data?.[0] ?? [];
  const roadmap = data?.[1] ?? [];

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
    <div
      ref={ref}
      className={`fixed rounded-xl bg-white px-5 py-10 top-1/2 left-1/2 z-99 transform ${
        isOpened
          ? "translate-x-[-50%] translate-y-[-50%]"
          : "translate-x-[500%] translate-y-[-50%]"
      } duration-300 ease-in-out xl:translate-x-0 xl:relative xl:top-50 xl:left-0`}
    >
      <div className="grid grid-cols-2 gap-2">
        {filters?.map((filter: string) => {
          return (
            <Button
              onClick={() => {
                handleFilterChange(filter);
                setIsOpened(false);
              }}
              type="secondary"
            >
              {filter}
            </Button>
          );
        })}
      </div>
      {!isLoading && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h6 className="font-semibold">Roadmap</h6>
            <a className="text-blue-600 hover:underline cursor-pointer">View</a>
          </div>
          <ul className="flex flex-col list-none gap-1 mt-5">
            {roadmap &&
              roadmap.map((item: Roadmap) => {
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
      )}
    </div>
  );
}
