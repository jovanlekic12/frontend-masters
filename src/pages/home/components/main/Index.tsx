import { LogInProps } from "@/utils/types";
import Header from "./header/Index";
import ProductsList from "./list/Index";

export default function Main({ setToken, token }: LogInProps) {
  return (
    <section className="">
      <Header setToken={setToken} token={token} />
      <ProductsList />
    </section>
  );
}
