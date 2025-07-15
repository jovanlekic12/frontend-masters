import { useSearchParams } from "react-router";
import { fetchProductRequests } from "../../../../../api/product-reqs";
import Loader from "../../../../../components/Loader";
import { FaAngleUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import type { ProductReq } from "../../../../../utils/types";
import { useInfiniteScroll } from "../../../../../hooks/useInfiniteScroll";

const PAGE_SIZE = 10;

export default function ProductsList() {
  const [params] = useSearchParams();
  const [reqs, setReqs] = useState<ProductReq[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setReqs([]);
    setPage(0);
    setHasMore(true);
  }, [params]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const newItems = await fetchProductRequests(params, page, PAGE_SIZE);

    setReqs((prev) => (page === 0 ? newItems : [...prev, ...newItems]));
    setPage((prev) => prev + 1);
    if (newItems.length < PAGE_SIZE) {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [page, params, isLoading, hasMore]);

  console.log(params);
  const sentinelRef = useInfiniteScroll({
    callback: loadMore,
    isLoading,
    hasMore,
  });
  return (
    <ul className="flex flex-col list-none gap-7 mt-5">
      {reqs &&
        reqs.map((req) => {
          return (
            <li className="flex items-center w-full justify-between px-5 py-2">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center px-2 py-2">
                  <FaAngleUp className="text-blue-600" />
                  <h5 className="text-black font-bold text-base">
                    {req.upvotes}
                  </h5>
                </div>
                <div className="flex flex-col items-start">
                  <h5 className="text-black font-bold text-lg">{req.title}</h5>
                  <p>{req.description}</p>
                  <span className="capitalize text-blue-600 font-semibold">
                    {req.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 justify-self-end">
                <FaRegCommentDots />
                <span>{req.comments?.length}</span>
              </div>
            </li>
          );
        })}
      {isLoading && <Loader />}
      <div ref={sentinelRef} style={{ height: "1px" }} />
    </ul>
  );
}
