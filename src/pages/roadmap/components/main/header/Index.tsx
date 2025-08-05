import { logInUser } from "@/api/login";
import Button from "@/components/ui/Button";
import { supabase } from "@/supabase/supabase";
import { LogInProps } from "@/utils/types";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineLightbulb } from "react-icons/md";

type Props = LogInProps & {
  setIsFormOpened: (isFormOpened: boolean) => void;
};

export default function Header({ setToken, token, setIsFormOpened }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function SetUser() {
    setIsLoading(true);
    try {
      const { data, error } = await logInUser();
      console.log(data, "login");

      if (error) {
        console.error("Login failed:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <header className="rounded-2xl bg-blue-600 flex items-center flex-col gap-2  sm:flex-row justify-between py-6 px-5 text-white ">
      <div className="flex items-center gap-2.5">
        <h4 className="text-sm font-medium sm:text-lg">Suggestions</h4>
        <div className="flex items-center gap-2.5">
          <h4 className="font-medium sm:text-lg">Sort by:</h4>
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
