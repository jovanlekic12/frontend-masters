import Main from "./components/main/Index";
import SideBar from "./components/sidebar/Index";

export default function Home() {
  return (
    <main className="max-w-7xl m-20 mx-auto grid grid-cols-[300px_minmax(900px,_1fr)]">
      <SideBar />
      {/* <Main /> */}
    </main>
  );
}
