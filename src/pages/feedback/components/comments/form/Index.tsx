import { InsertComment } from "@/api/comments";
import Button from "@/components/ui/Button";
import { Comment } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import z from "zod";

type Props = {
  username?: string;
  replyTo: string | null;
};

const commentShema = z.object({
  content: z
    .string()
    .min(5, "Comment can not be shorter than 5 characters")
    .max(250, "Comment can not be longer than 250 characters"),
});

export default function Form({ username, replyTo }: Props) {
  let params = useParams();
  console.log(username);
  const [counter, setCounter] = useState(250);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(commentShema),
  });

  const onSubmit = async (data: Comment) => {
    if (!username) {
      toast.error("Please login");
      reset();
      setCounter(250);
      return;
    }
    const error = await InsertComment(params?.id, username, data.content);
    if (error) {
      console.error(error, "Error adding comment");
    } else {
      reset();
      window.location.reload();
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold">
        {replyTo ? `Reply to user: ${replyTo}` : "Add comment"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content")}
          maxLength={250}
          onChange={(e) => setCounter(250 - e.target.value.length)}
          className="block w-full min-h-20 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        ></textarea>
        {errors.content && (
          <p className="text-red-500 mt-1 font-medium">
            {errors.content.message}
          </p>
        )}
        <div className="mt-5 flex items-center justify-between">
          <p className="font-medium">{counter} characters left</p>
          <Button type="primary">
            {isSubmitting ? "Posting comment..." : "Post Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
}
