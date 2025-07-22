import { FaBars } from "react-icons/fa";

import SidebarRoadmap from "./roadmap/Index";
import { useState } from "react";
import Overlay from "@/components/ui/Overlay";
import Button from "@/components/ui/Button";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";

export default function SideBar() {
  //
  const isSmallScreen = useIsSmallScreen(1280);
  const [isOpened, setIsOpened] = useState(false);
  return (
    <aside className="flex flex-col items-center">
      <div className="flex items-center justify-between text-white text-2xl font-semibold bg-linear-to-r/srgb from-indigo-500 to-teal-400 py-5 px-5 rounded-2xl w-full xl:justify-center xl:py-18">
        Feedback Board
        {isSmallScreen && (
          <Button type="primary" onClick={() => setIsOpened(true)}>
            <FaBars />
          </Button>
        )}
      </div>
      <SidebarRoadmap isOpened={isOpened} setIsOpened={setIsOpened} />
      {isOpened && <Overlay></Overlay>}
    </aside>
  );
}
