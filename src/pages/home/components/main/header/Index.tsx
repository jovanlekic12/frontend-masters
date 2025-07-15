import { useState } from "react";
import { MdOutlineLightbulb } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router";
import Button from "../../../../../components/ui/Button";

export default function Header() {
  const sorts = [
    { label: "Most likes", value: "likes-desc" },
    { label: "Least likes", value: "likes-asc" },
    { label: "Most comments", value: "comments-desc" },
    { label: "Least comments", value: "comments-asc" },
  ];

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleSortChange = (sort: string, name: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (sort) {
      newParams.set(name, sort);
    } else {
      newParams.delete(name);
    }
    navigate({ search: newParams.toString() });
  };

  return (
    <header className="rounded-2xl bg-blue-600 flex items-center justify-between py-6 px-5 text-white ">
      <div className="flex items-center gap-2.5">
        <MdOutlineLightbulb className="text-x text-2xl" />
        <h4 className="text-xl font-medium">Suggestions</h4>
        <div className="flex items-center gap-2.5">
          <h4 className="text-xl font-medium">Sort by:</h4>
          <select
            className="text-lg"
            onChange={(e) => handleSortChange(e.target.value, "sortBy")}
          >
            {sorts.map((sort) => (
              <option
                key={sort.value}
                value={sort.value}
                className="bg-blue-600"
              >
                {sort.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button type="primary">Add Feedback</Button>
    </header>
  );
}
