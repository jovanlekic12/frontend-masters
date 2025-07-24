import { supabase } from "../supabase/supabase";
import type { ProductReq, Roadmap } from "../utils/types";
import { toast } from "react-toastify";

export const fetchProductRequests = async (
  params: URLSearchParams,
  page: number,
  pageSize: number
): Promise<ProductReq[]> => {
  let query = supabase
    .from("product-requests")
    .select("*,comments(id)")
    .range(page * pageSize, page * pageSize + pageSize - 1);

  const category = params.get("category");
  if (category !== "all" && category) {
    query = query.eq("category", category);
  }

  const sort = params.get("sortBy");
  switch (sort) {
    case "likes-asc":
      query = query.order("upvotes", { ascending: true });
      break;
    case "likes-desc":
      query = query.order("upvotes", { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch product requests:", error.message);
    return [];
  }

  return data as ProductReq[];
};

export const fetchFilters = async (): Promise<string[]> => {
  const { data: reqs, error } = await supabase
    .from("product-requests")
    .select("category");

  if (error) {
    console.error("Failed to fetch product requests:", error.message);
    return [];
  }

  const categories = [];

  if (Array.isArray(reqs)) {
    for (const req of reqs) {
      if (typeof req.category === "string") {
        categories.push(req.category);
      }
    }
  }
  const uniqueCategories = Array.from(new Set(categories));

  return uniqueCategories;
};
export const fetchRoadmapCounts = async (): Promise<Roadmap[]> => {
  const { data, error } = await supabase
    .from("product-requests")
    .select("status");

  if (error || !data) {
    console.error("Failed to fetch statuses:", error?.message);
    return [];
  }

  const countsMap = new Map<string, number>();

  for (const row of data as { status: string }[]) {
    countsMap.set(row.status, (countsMap.get(row.status) || 0) + 1);
  }

  const result: Roadmap[] = Array.from(countsMap.entries()).map(
    ([status, count]) => ({ status, count })
  );

  return result;
};

export const InsertFeedback = async (product: ProductReq) => {
  const { error } = await supabase.from("product-requests").insert([
    {
      id: 14,
      title: product.title,
      category: product.category,
      upvotes: 0,
      upvoted: false,
      status: "suggestion",
      description: product.description,
    },
  ]);
  if (error) {
    console.error("Error adding feedback", error);
    toast.error("Something went wrong.");
  } else {
    toast.success("Feedback submitted successfully!");
  }
  return error;
};
