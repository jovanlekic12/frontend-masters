import { supabase } from "../supabase/supabase";
import type { ProductReq } from "../utils/types";

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

  const categories = ["all"];

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
