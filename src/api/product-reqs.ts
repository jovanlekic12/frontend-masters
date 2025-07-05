import { supabase } from "../supabase/supabase";
import type { ProductReq } from "../utils/types";

export const fetchProductRequests = async (): Promise<ProductReq[]> => {
  const { data, error } = await supabase.from("product-requests").select("*");

  if (error) {
    console.error("Failed to fetch product requests:", error.message);
    return [];
  }

  return data as ProductReq[];
};
