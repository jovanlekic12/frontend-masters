import { fetchProductRequests, fetchUpvotes } from "@/api/product-reqs";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ProductReq, Token } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ProductReqItem from "./ReqItem";
import Loader from "../Loader";

type Props = {
  token: Token;
  searchTerm?: string;
};
const PAGE_SIZE = 10;
export default function ProductsList({ token, searchTerm }: Props) {
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
  }, [params, searchTerm]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const newItems = await fetchProductRequests(
      params,
      page,
      PAGE_SIZE,
      searchTerm
    );

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
  return (
    <ul className="flex flex-col list-none gap-7 mt-5">
      {reqs &&
        reqs.map((req) => {
          return (
            <ProductReqItem
              {...req}
              upvotedFeedbacks={upvotes}
              token={token}
              key={req.id}
            />
          );
        })}
      {isLoading && <Loader />}
      <div ref={sentinelRef} style={{ height: "1px" }} />
    </ul>
  );
}
