import { LogInProps } from "@/utils/types";
import Header from "./header/Index";
import ProductsList from "./list/Index";

export default function Main({ setToken }: LogInProps) {
  return (
    <section className="">
      <Header setToken={setToken} />
      <ProductsList />
    </section>
  );
}
