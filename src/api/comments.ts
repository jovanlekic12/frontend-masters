import { supabase } from "@/supabase/supabase";
import { Comment, Reply } from "@/utils/types";
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

export const CheckForTags = async (userUsername: string): Promise<Reply[]> => {
  const { data, error } = await supabase
    .from("replies")
    .select("*,comments(content,username),users(image)")
    .eq("replyingTo", userUsername)
    .eq("seen", false);
  if (error) {
    toast.error("Error getting tags");
    console.error(error);
  }

  return data;
};

export const SeenNotifications = async (
  userUsername: string,
  productId: string
) => {
  const { data, error } = await supabase
    .from("replies")
    .update({ seen: true })
    .eq("product_id", productId)
    .eq("replyingTo", userUsername)
    .eq("seen", false);
  if (error) {
    toast.error("Error getting tags");
    console.error(error);
  }
  return error;
};
