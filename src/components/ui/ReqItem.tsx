import { ProductReq, Token, upvotedFeedback } from "@/utils/types";
import { FaAngleUp, FaRegCommentDots } from "react-icons/fa";
import Button from "./Button";
import { feedbackUpvote, toogleUpvoteFeedback } from "@/api/product-reqs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Loader from "../Loader";

type ProductReqItemProps = ProductReq & {
  token?: Token;
  upvotedFeedbacks: upvotedFeedback[];
  isLoading?: boolean;
  single?: boolean;
};

export default function ProductReqItem({
  id,
  upvotes,
  title,
  description,
  category,
  comments,
  upvotedFeedbacks,
  token,
  isLoading,
  single,
}: ProductReqItemProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotesCounter, setUpvotesCounter] = useState(upvotes);
  useEffect(() => {
    if (upvotedFeedbacks && token) {
      const contains = upvotedFeedbacks.some(
        (feedback) => feedback.feedback_id === id
      );
      setIsUpvoted(contains);
    }
  }, [upvotedFeedbacks]);

  useEffect(() => {
    if (upvotes) {
      setUpvotesCounter(upvotes);
    }
  }, [upvotes]);

  async function handleClick() {
    if (!token) {
      toast.error("Please login");
      return;
    }

    const delta = isUpvoted ? -1 : 1;
    const newIsUpvoted = !isUpvoted;

    setIsUpvoted(newIsUpvoted);
    setUpvotesCounter((prev) => prev + delta);

    try {
      await handleVoteChange(delta);
    } catch (err) {
      setIsUpvoted(isUpvoted);
      setUpvotesCounter((prev) => prev - delta);
      toast.error("Vote update failed");
    }
  }

  async function handleVoteChange(delta: number) {
    await feedbackUpvote(id, upvotes + delta);
    await toogleUpvoteFeedback(id);
  }

  return (
    <>
      {isLoading && <Loader></Loader>}
      {!isLoading && (
        <li className="flex items-center w-full justify-between sm:px-5 px-2 py-2">
          <div className="flex items-center gap-4">
            <Button type="upvote" onClick={handleClick} isActive={isUpvoted}>
              <FaAngleUp className="text-blue-600" />
              <h5 className="text-black font-bold sm:text-md text-sm">
                {upvotesCounter}
              </h5>
            </Button>
            <div className="flex flex-col items-start">
              {single && (
                <h1 className="text-black font-bold sm:text-lg text-md">
                  {title}
                </h1>
              )}
              {!single && (
                <Link
                  className="text-black font-bold sm:text-lg text-md hover:text-blue-600"
                  to={`product/${id}`}
                >
                  {title}
                </Link>
              )}

              <p className="sm:text-md text-sm">{description}</p>
              <span className="capitalize text-blue-600 font-semibold sm:text-md text-sm">
                {category}
              </span>
            </div>
          </div>
          {comments && !single && (
            <div className="flex items-center gap-1 justify-self-end sm:text-md text-sm">
              <FaRegCommentDots />
              <span>{comments?.length}</span>
            </div>
          )}
        </li>
      )}
    </>
  );
}
