import { Link, useNavigate, useSearchParams } from "react-router";
import { useRef, useState } from "react";
import { fetchFilters, fetchRoadmapCounts } from "@/api/product-reqs";
import { useFetchData } from "@/hooks/useFetchData";
import { useOutsideClick } from "@/hooks/useClickOutside";
import Button from "@/components/ui/Button";
import { Roadmap } from "@/utils/types";

type Props = {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
};

export default function SidebarRoadmap({ isOpened, setIsOpened }: Props) {
  const { isLoading, data } = useFetchData(
    { handler: fetchFilters },
    { handler: fetchRoadmapCounts }
  );
  const [filters, roadmap] = data ?? [];
  const ref = useRef<HTMLDivElement>(null);
  const [activeBtn, setActiveBtn] = useState("all");

  useOutsideClick(ref, () => setIsOpened(false), isOpened);

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
    setIsOpened(false);
    setActiveBtn(filter);
  };

  return (
    <div
      ref={ref}
      className={`fixed rounded-xl bg-white px-5 py-10 top-1/2 left-1/2 z-99 transform ${
        isOpened
          ? "translate-x-[-50%] translate-y-[-50%]"
          : "translate-x-[500%] translate-y-[-50%]"
      } duration-300 ease-in-out xl:translate-x-0 xl:relative xl:top-50 xl:left-0 xl:z-10`}
    >
      <div className="grid grid-cols-2 gap-2">
        {filters?.map((filter: string) => {
          return (
            <Button
              onClick={() => {
                handleFilterChange(filter);
              }}
              type="secondary"
              isActive={activeBtn === filter}
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
            <Link
              to="login"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              View
            </Link>
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
