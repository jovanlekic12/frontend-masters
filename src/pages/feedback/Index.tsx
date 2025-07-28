import { fetchSingleFeedback } from "@/api/product-reqs";
import { ProductReq } from "@/utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Feedback() {
  let params = useParams();
  const [feedback, setFeedback] = useState<ProductReq>();
  useEffect(() => {
    const getFeedback = async () => {
      const data = await fetchSingleFeedback(params.id);
      setFeedback(data);
    };
    getFeedback();
  }, []);
  console.log(feedback);

  return <main></main>;
}
