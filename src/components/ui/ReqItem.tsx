import { ProductReq } from "@/utils/types";
import { FaAngleUp, FaRegCommentDots } from "react-icons/fa";
import Button from "./Button";
import { feedbackUpvote } from "@/api/product-reqs";

export default function ProductReqItem({
  id,
  upvotes,
  title,
  description,
  category,
  comments,
}: ProductReq) {
  async function handleIncrement() {
    await feedbackUpvote(id, "increment", upvotes + 1);
  }

  return (
    <li className="flex items-center w-full justify-between px-5 py-2">
      <div className="flex items-center gap-4">
        <Button type="upvote" onClick={handleIncrement}>
          <FaAngleUp className="text-blue-600" />
          <h5 className="text-black font-bold text-base">{upvotes}</h5>
        </Button>
        <div className="flex flex-col items-start">
          <h5 className="text-black font-bold text-lg">{title}</h5>
          <p>{description}</p>
          <span className="capitalize text-blue-600 font-semibold">
            {category}
          </span>
        </div>
      </div>
      {comments && (
        <div className="flex items-center gap-1 justify-self-end">
          <FaRegCommentDots />
          <span>{comments?.length}</span>
        </div>
      )}
    </li>
  );
}
