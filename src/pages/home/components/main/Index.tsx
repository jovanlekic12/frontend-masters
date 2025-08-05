import { LogInProps } from "@/utils/types";
import Header from "./header/Index";
import ProductsList from "@/components/ui/FeedbacksList";

type Props = LogInProps & {
  setIsFormOpened: (isFormOpened: boolean) => void;
};

export default function Main({ setToken, token, setIsFormOpened }: Props) {
  return (
    <section>
      <Header
        setToken={setToken}
        token={token}
        setIsFormOpened={setIsFormOpened}
      />
      <ProductsList token={token} />
    </section>
  );
}
