import { logInUser } from "@/api/login";
import Button from "@/components/ui/Button";
import { LogInProps } from "@/utils/types";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import debounce from "lodash.debounce";
type Props = LogInProps & {
  setIsFormOpened: (isFormOpened: boolean) => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
};

export default function Header({
  token,
  setIsFormOpened,
  searchTerm,
  setSearchTerm,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function SetUser() {
    setIsLoading(true);
    try {
      const { error } = await logInUser();
      if (error) {
        console.error("Login failed:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const debouncedSearch = useCallback(debounce(handleSearchChange, 300), []);
  return (
    <header className="rounded-2xl bg-blue-600 flex items-center flex-col gap-2  sm:flex-row justify-between py-6 px-5 text-white ">
      <div className="flex items-center gap-2.5">
        <h4 className="text-sm font-medium sm:text-lg">Roadmap</h4>
        <div className="relative">
          <input
            type="text"
            className="border-2 border-solid rounded-lg h-8 px-2 pr-8 placeholder-white focus:outline-0"
            placeholder="Search..."
            onChange={debouncedSearch}
          />
          <IoSearch className="absolute top-[50%] right-2 translate-y-[-50%] w-5 h-5" />
        </div>
      </div>
      {!token && (
        <Button type="secondary" onClick={SetUser}>
          <FcGoogle />
          Login
        </Button>
      )}
      {token && (
        <div className="flex items-center gap-2">
          <Button type="primary" onClick={() => setIsFormOpened(true)}>
            Add Feedback
          </Button>
        </div>
      )}
    </header>
  );
}
