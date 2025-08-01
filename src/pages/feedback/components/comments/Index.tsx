import { Comment, Token } from "@/utils/types";
import CommentItem from "./Item/Index";
import Form from "./form/Index";
import { useState } from "react";

type Props = {
  comments: Comment[];
  token?: Token;
};

export default function CommentsSection({ token, comments }: Props) {
  const username = token?.user.email.split("@")[0];
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [commentId, setCommentId] = useState<string | null>(null);
  return (
    <div className="mt-10">
      <h2 className="font-semibold">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>
      {comments && (
        <ul className="mt-5 flex flex-col gap-5">
          {comments.map((comment) => {
            return (
              <CommentItem
                {...comment}
                setReplyTo={setReplyTo}
                token={token}
                setCommentId={setCommentId}
              />
            );
          })}
        </ul>
      )}
      <Form username={username} replyTo={replyTo} commentId={commentId} />
    </div>
  );
}
