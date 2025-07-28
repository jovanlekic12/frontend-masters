import { LogInProps } from "@/utils/types";
import Header from "./header/Index";
import ProductsList from "./list/Index";

type Props = LogInProps & {
  setIsFormOpened: (isFormOpened: boolean) => void;
};

export default function Main({ setToken, token, setIsFormOpened }: Props) {
  return (
    <section className="">
      <Header
        setToken={setToken}
        token={token}
        setIsFormOpened={setIsFormOpened}
      />
      <ProductsList token={token} />
    </section>
  );
}
