import { supabase } from "@/supabase/supabase";
import { Comment } from "@/utils/types";
import { toast } from "react-toastify";

export const InsertComment = async (
  productId: string,
  username: string,
  content: string
) => {
  const { error } = await supabase.from("comments").insert([
    {
      product_id: productId,
      content: content,
      username: username,
    },
  ]);
  if (error) {
    console.error("Error adding comment", error);
    toast.error("Something went wrong.");
  }
  return error;
};

export const InsertReply = async (
  commentId: string,
  content: string,
  username: string,
  replyingTo: string
) => {
  const { error } = await supabase.from("replies").insert([
    {
      comment_id: commentId,
      content: content,
      username: username,
      replyingTo: replyingTo,
    },
  ]);
  if (error) {
    console.error("Error replying to user", error);
    toast.error("Something went wrong.");
  }
  return error;
};
