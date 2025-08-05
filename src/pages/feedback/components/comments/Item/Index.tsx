import Button from "@/components/ui/Button";
import { Comment, Token } from "@/utils/types";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = Comment & {
  setReplyTo: (replyTo: string | null) => void;
  setCommentId: (id: string | null) => void;
  token?: Token;
};

export default function CommentItem({
  id,
  users,
  content,
  setReplyTo,
  token,
  replies,
  setCommentId,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleReply(username?: string) {
    if (!token) {
      toast.error("You must login first");
      return;
    }
    setReplyTo(username ? username : users.username);
    setCommentId(id);
  }
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 border-b-2 border-gray-300 w-full pb-2">
        <img src={users.image} alt="" className="rounded-full w-12" />
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0">
              <h5 className="font-semibold">{users.name}</h5>
              <p className="font-semibold text-sm">@{users.username}</p>
            </div>
            <Button type="secondary" onClick={() => handleReply}>
              Reply
            </Button>
          </div>
          <h6>{content}</h6>
        </div>
      </div>
      {replies.length !== 0 && !isCollapsed && (
        <ul className="px-10 bg-blue-50 py-2">
          {replies.map((reply) => {
            return (
              <li
                key={reply.id}
                className="flex items-center gap-3 border-b-2 border-gray-300 w-full pb-2"
              >
                <img
                  src={reply.users.image}
                  alt=""
                  className="rounded-full w-12"
                />
                <div className="flex flex-col w-full gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0">
                      <h5 className="font-semibold">{reply.users.name}</h5>
                      <p className="font-semibold text-sm">
                        @{reply.users.username}
                        <span className="ml-5 rounded-xl bg-blue-300 py-0.5 px-2">
                          @{reply.replyingTo}
                        </span>
                      </p>
                    </div>
                    <Button
                      type="secondary"
                      onClick={() => handleReply(reply.users.username)}
                    >
                      Reply
                    </Button>
                  </div>
                  <h6>{reply.content}</h6>
                </div>
              </li>
            );
          })}
          <h4
            className="font-semibold text-gray-500 text-center mt-2 underline cursor-pointer"
            onClick={() => setIsCollapsed(true)}
          >
            Hide replies
          </h4>
        </ul>
      )}
      {replies.length !== 0 && isCollapsed && (
        <h4
          className="font-semibold text-gray-500 text-center mt-2 underline cursor-pointer"
          onClick={() => setIsCollapsed(false)}
        >
          Show replies {replies.length}
        </h4>
      )}
    </div>
  );
}
