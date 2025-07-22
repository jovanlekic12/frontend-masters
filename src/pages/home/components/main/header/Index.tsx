import { logInUser } from "@/api/login";
import Button from "@/components/ui/Button";
import { LogInProps } from "@/utils/types";
import { useState } from "react";
import { MdOutlineLightbulb } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router";

export default function Header({ setToken }: LogInProps) {
  const sorts = [
    { label: "Most likes", value: "likes-desc" },
    { label: "Least likes", value: "likes-asc" },
    { label: "Most comments", value: "comments-desc" },
    { label: "Least comments", value: "comments-asc" },
  ];

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSortChange = (sort: string, name: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (sort) {
      newParams.set(name, sort);
    } else {
      newParams.delete(name);
    }
    navigate({ search: newParams.toString() });
  };

  async function SetUser() {
    setIsLoading(true);
    try {
      const { data, error } = await logInUser();
      if (error) {
        console.error("Login failed:", error.message);
      } else {
        console.log(data);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <header className="rounded-2xl bg-blue-600 flex items-center justify-between py-6 px-5 text-white ">
      <div className="flex items-center gap-2.5">
        <MdOutlineLightbulb className="text-xl" />
        <h4 className="text-lg font-medium">Suggestions</h4>
        <div className="flex items-center gap-2.5">
          <h4 className="text-lg font-medium">Sort by:</h4>
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
      <Button type="primary" onClick={SetUser}>
        Add Feedback
      </Button>
    </header>
  );
}
