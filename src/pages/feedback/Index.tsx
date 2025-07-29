import { fetchSingleFeedback, fetchUpvotes } from "@/api/product-reqs";
import { Comment, LogInProps, ProductReq, Token } from "@/utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "./components/header/Index";
import ProductReqItem from "@/components/ui/ReqItem";
import { toast } from "react-toastify";
import CommentsSection from "./components/comments/Index";

export default function Feedback({ token, setToken }: LogInProps) {
  let params = useParams();
  const [feedback, setFeedback] = useState<ProductReq>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upvotesCounter, setUpvotesCounter] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const feedbackData = await fetchSingleFeedback(params.id);
        setFeedback(feedbackData);
        setComments(feedbackData.comments);
        const upvotesData = await fetchUpvotes();
        setUpvotesCounter(upvotesData);
      } catch (err) {
        toast.error("something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  console.log(feedback);

  return (
    <main className="max-w-7xl m-20 mx-auto flex flex-col gap-10 px-5">
      <Header token={token} setToken={setToken} />
      {!isLoading && (
        <section>
          <ProductReqItem
            {...feedback}
            isLoading={isLoading}
            upvotedFeedbacks={upvotesCounter}
            token={token}
          />
          <CommentsSection comments={comments} />
        </section>
      )}
    </main>
  );
}
