import { LogInProps } from "@/utils/types";
import Main from "./components/main/Index";
import SideBar from "./components/sidebar/Index";
import { createPortal } from "react-dom";
import { useState } from "react";
import FeedbackForm from "./components/form/Index";
import Overlay from "@/components/ui/Overlay";
import { Slide, ToastContainer } from "react-toastify";

export default function Home({ setToken, token }: LogInProps) {
  const [isFormOpened, setIsFormOpened] = useState(false);

  return (
    <main className="max-w-7xl m-10 mx-auto flex flex-col gap-10 px-5 xl:grid xl:grid-cols-[300px_minmax(900px,_1fr)]">
      <SideBar />
      <Main
        setToken={setToken}
        token={token}
        setIsFormOpened={setIsFormOpened}
      />
      {isFormOpened &&
        createPortal(
          <FeedbackForm
            setIsFormOpened={setIsFormOpened}
            isFormOpened={isFormOpened}
          />,
          document.body
        )}
      {isFormOpened && createPortal(<Overlay />, document.body)}
      <ToastContainer
        toastClassName="custom-toast"
        position="top-center"
        progressClassName="custom-progress"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        transition={Slide}
      />
    </main>
  );
}
