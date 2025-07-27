import { useSearchParams } from "react-router";
import {
  fetchProductRequests,
  fetchUpvotes,
} from "../../../../../api/product-reqs";
import Loader from "../../../../../components/Loader";
import { useCallback, useEffect, useState } from "react";
import type { ProductReq, Token } from "../../../../../utils/types";
import { useInfiniteScroll } from "../../../../../hooks/useInfiniteScroll";
import ProductReqItem from "../../../../../components/ui/ReqItem";

const PAGE_SIZE = 10;
export default function ProductsList() {
  const [params] = useSearchParams();
  const [reqs, setReqs] = useState<ProductReq[]>([]);
  const [upvotes, setUpvotes] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getUpvotes = async () => {
      const data = await fetchUpvotes();
      setUpvotes(data);
    };
    getUpvotes();
  }, []);

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

  const sentinelRef = useInfiniteScroll({
    callback: loadMore,
    isLoading,
    hasMore,
  });
  console.log(upvotes);
  return (
    <ul className="flex flex-col list-none gap-7 mt-5">
      {reqs &&
        reqs.map((req) => {
          return <ProductReqItem {...req} upvotedFeedbacks={upvotes} />;
        })}
      {isLoading && <Loader />}
      <div ref={sentinelRef} style={{ height: "1px" }} />
    </ul>
  );
}
