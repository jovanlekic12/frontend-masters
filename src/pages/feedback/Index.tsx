import { fetchSingleFeedback } from "@/api/product-reqs";
import { LogInProps, ProductReq, Token } from "@/utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "./components/header/Index";

export default function Feedback({ token, setToken }: LogInProps) {
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

  return (
    <main className="max-w-7xl m-20 mx-auto flex flex-col gap-10 px-5">
      <Header token={token} setToken={setToken} />
    </main>
  );
}
