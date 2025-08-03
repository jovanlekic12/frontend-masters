import { Link, useNavigate, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { fetchFilters, fetchRoadmapCounts } from "@/api/product-reqs";
import { useFetchData } from "@/hooks/useFetchData";
import { useOutsideClick } from "@/hooks/useClickOutside";
import Button from "@/components/ui/Button";
import { Reply, Roadmap } from "@/utils/types";
import { supabase } from "@/supabase/supabase";
import { CheckForTags } from "@/api/comments";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";
type Props = {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
};

export default function SidebarRoadmap({ isOpened, setIsOpened }: Props) {
  const isSmallScreen = useIsSmallScreen(1280);

  const { isLoading, data } = useFetchData(
    { handler: fetchFilters },
    { handler: fetchRoadmapCounts }
  );
  const [filters, roadmap] = data ?? [];
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const [activeBtn, setActiveBtn] = useState("all");

  useOutsideClick(ref, () => setIsOpened(false), isOpened);

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleFilterChange = (filter: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (filter) {
      newParams.set("category", filter);
    } else {
      newParams.delete("category");
    }
    navigate({ search: newParams.toString() });
    setIsOpened(false);
    setActiveBtn(filter);
  };

  useEffect(() => {
    const getNotifications = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const username = user.email.split("@")[0];
        const data = await CheckForTags(username);
        setUsername(username);
        setNotifications(data);
      }
    };
    getNotifications();
  }, []);
  console.log(notifications, "not");
  return (
    <div
      ref={ref}
      className={`${
        isSmallScreen ? "fixed top-1/2 left-1/2 z-99 transform" : ""
      } rounded-xl w-9/10 sm:w-fit bg-white px-5 py-10 ${
        isOpened && " translate-x-[-50%] translate-y-[-50%]"
      } ${
        !isOpened && isSmallScreen && " translate-x-[500%] translate-y-[-50%]"
      } duration-300 ease-in-out `}
    >
      <div className="grid grid-cols-2 gap-2">
        {filters?.map((filter: string) => {
          return (
            <Button
              onClick={() => {
                handleFilterChange(filter);
              }}
              type="secondary"
              isActive={activeBtn === filter}
            >
              {filter}
            </Button>
          );
        })}
      </div>
      {!isLoading && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h6 className="font-semibold">Roadmap</h6>
            <Link
              to="login"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              View
            </Link>
          </div>
          <ul className="flex flex-col list-none gap-1 mt-5">
            {roadmap &&
              roadmap.map((item: Roadmap) => {
                return (
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 text-2xl">•</span>
                      <span className="text-lg capitalize">{item.status}</span>
                    </div>
                    <span className="font-bold text-lg">{item.count}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h6 className="font-semibold flex items-center gap-1">
            New notifications
            {notifications.length > 0 ? (
              <MdNotificationsActive className="w-5 h-5 text-blue-500" />
            ) : (
              <MdOutlineNotificationsActive className="w-5 h-5 text-blue-500" />
            )}
          </h6>
          {notifications.length > 0 && (
            <h6 className="font-bold text-lg text-blue-500 ">
              {notifications.length}
            </h6>
          )}
        </div>
        <ul className="flex flex-col list-none gap-2 mt-5 max-h-60 overflow-y-scroll">
          {notifications &&
            notifications.map((notification) => {
              return (
                <Link
                  to={`product/${notification.product_id}`}
                  className="flex items-start gap-1.5 hover:bg-blue-200 duration-200 rounded-xl px-2 py-2"
                >
                  <img
                    src={notification.users.image}
                    alt=""
                    className="w-8.5 h-8.5 rounded-full border-2 border-solid border-purple-500"
                  />
                  <span className="text-sm">
                    <span className="font-semibold">
                      @{notification.username}
                    </span>{" "}
                    tagged you at{" "}
                    {username === notification.comments.username
                      ? "your comment " +
                        '"' +
                        notification.comments.content.substring(0, 10) +
                        `${
                          notification.comments.content.length > 10
                            ? '...".'
                            : '".'
                        }`
                      : notification.comments.username + "'s comment."}
                  </span>
                </Link>
              );
            })}
        </ul>
        {notifications.length === 0 && (
          <div className="w-full flex flex-col items-center mt-5">
            <img src="./no-notification.png" alt="" />
            <h1 className="text-lg font-semibold text-purple-500">
              No new notifications
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
