import { FaAngleUp, FaRegCommentDots } from "react-icons/fa";
import type { ProductReq } from "../../utils/types";

export default function ProductReqItem({
  upvotes,
  title,
  description,
  category,
  comments,
}: ProductReq) {
  return (
    <li className="flex items-center w-full justify-between px-5 py-2">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center px-2 py-2">
          <FaAngleUp className="text-blue-600" />
          <h5 className="text-black font-bold text-base">{upvotes}</h5>
        </div>
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
