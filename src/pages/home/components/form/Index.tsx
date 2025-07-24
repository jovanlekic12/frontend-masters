import { fetchFilters, InsertFeedback } from "@/api/product-reqs";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductReq } from "@/utils/types";
import { useOutsideClick } from "@/hooks/useClickOutside";

type Props = {
  setIsFormOpened: (isOpened: boolean) => void;
  isFormOpened: boolean;
};

const feedbackShema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  category: z.string(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description can't be logner than 200 characters"),
});

export default function FeedbackForm({ setIsFormOpened, isFormOpened }: Props) {
  const [categories, setCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
    },
    resolver: zodResolver(feedbackShema),
  });

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsFormOpened(false), isFormOpened);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFilters();
      setCategories(data);
      if (data.length) {
        reset({ title: "", category: data[0], description: "" });
      }
    };

    fetchData();
  }, [reset]);
  const onSubmit = async (data: ProductReq) => {
    const error = await InsertFeedback(data);
    if (error) {
      console.error(error, "Error adding new feedback");
    } else {
      reset();
      setIsFormOpened(false);
    }
  };
  return (
    <div
      ref={ref}
      className="fixed px-5 py-15 bg-white z-50 top-1/2 left-1/2 transform 
         translate-x-[-50%] translate-y-[-50%] rounded-2xl w-4/5 xl:w-200"
    >
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create new feedback</h1>
        <Button type="round" onClick={() => setIsFormOpened(false)}>
          <ImCross />
        </Button>
      </div>
      <form className="px-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="block text-lg font-medium text-gray-900">
            Feedback Title
          </label>
          <p className="text-sm text-gray-800">
            Add a short, descriptive headline
          </p>
          <div className="mt-3">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                {...register("title")}
                type="text"
                className="block py-1.5 pr-3 pl-1 w-full text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            {errors.title && (
              <p className="text-red-500 mt-1 font-medium">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-7">
          <label className="block text-lg font-medium text-gray-900">
            Category
          </label>
          <p className="text-sm text-gray-800">
            Choose a category for your feedback
          </p>
          <div className="mt-3">
            <select
              {...register("category")}
              className="flex items-center capitalize rounded-md w-full py-1.5 bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
            >
              {categories &&
                categories.map((category) => {
                  return (
                    <option
                      key={category}
                      value={category}
                      className="capitalize w-full"
                    >
                      {category}
                    </option>
                  );
                })}
            </select>
            {errors.category && (
              <p className="text-red-500 mt-1 font-medium">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-7">
          <label className="block text-lg font-medium text-gray-900">
            Feedback detail
          </label>
          <p className="text-sm text-gray-800">
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <div className="mt-3">
            <textarea
              {...register("description")}
              className="block w-full min-h-20 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></textarea>
          </div>
          {errors.description && (
            <p className="text-red-500 mt-1 font-medium">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="flex justify-end mt-10 gap-5">
          <Button type="secondary" onClick={() => setIsFormOpened(false)}>
            Cancel
          </Button>
          <Button type="primary">
            {isSubmitting ? "Submiting..." : "Create feedback"}
          </Button>
        </div>
      </form>
    </div>
  );
}
