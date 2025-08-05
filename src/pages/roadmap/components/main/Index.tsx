import { LogInProps } from "@/utils/types";
import Header from "./header/Index";

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
    </section>
  );
}
