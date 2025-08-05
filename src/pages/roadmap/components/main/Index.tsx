import { LogInProps } from "@/utils/types";
import Header from "./header/Index";
import Filters from "./filters/Index";
import ProductsList from "@/components/ui/FeedbacksList";
import { useState } from "react";

type Props = LogInProps & {
  setIsFormOpened: (isFormOpened: boolean) => void;
};

export default function Main({ setToken, token, setIsFormOpened }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <section>
      <Header
        setToken={setToken}
        token={token}
        setIsFormOpened={setIsFormOpened}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <Filters />
      <ProductsList token={token} searchTerm={searchTerm} />
    </section>
  );
}
