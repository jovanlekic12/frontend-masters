import { LogInProps } from "@/utils/types";
import Login from "./components/header/Index";
import { useState } from "react";
import Main from "./components/main/Index";

export default function Roadmap({ token, setToken }: LogInProps) {
  const [isFormOpened, setIsFormOpened] = useState(false);

  return (
    <main className="max-w-7xl m-20 mx-auto flex flex-col gap-10 px-5">
      <Login token={token} setToken={setToken} />
      <Main
        token={token}
        setToken={setToken}
        setIsFormOpened={setIsFormOpened}
      />
    </main>
  );
}
