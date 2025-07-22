import { LogInProps } from "@/utils/types";
import Main from "./components/main/Index";
import SideBar from "./components/sidebar/Index";

export default function Home({ setToken }: LogInProps) {
  return (
    <main className="max-w-7xl m-20 mx-auto flex flex-col gap-10 px-5 xl:grid xl:grid-cols-[300px_minmax(900px,_1fr)]">
      <SideBar />
      <Main setToken={setToken} />
    </main>
  );
}
