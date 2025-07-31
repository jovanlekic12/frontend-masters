import { logInUser } from "@/api/login";
import Button from "@/components/ui/Button";
import { supabase } from "@/supabase/supabase";
import { LogInProps } from "@/utils/types";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router";
import { IoReturnDownBackSharp } from "react-icons/io5";
export default function Header({ token, setToken }: LogInProps) {
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

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
      } else {
        setToken(null);
        sessionStorage.removeItem("token");
        localStorage.removeItem("supabase.session");
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  console.log(token);

  return (
    <header className="flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center gap-0.5 text-blue-600 hover:underline cursor-pointer"
      >
        Back
        <IoReturnDownBackSharp />
      </Link>
      {!token && (
        <Button type="secondary" onClick={SetUser}>
          <FcGoogle />
          Login
        </Button>
      )}
      {token && (
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <img
              src={token.user.user_metadata.avatar_url}
              alt="avatar photo"
              className="rounded-full w-12"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg";
              }}
            />
            <h4 className="font-semibold">
              {token.user.user_metadata.full_name}
            </h4>
          </div>
          <Button type="primary" onClick={handleLogout}>
            {isLoading ? "Logging out..." : "Log out"} <TbLogout2 />
          </Button>
        </div>
      )}
    </header>
  );
}
