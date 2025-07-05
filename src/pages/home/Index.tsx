import Header from "./components/main/header/Index";
import ProductsList from "./components/main/list/Index";

export default function Home() {
  return (
    <main className="max-w-7xl m-20 mx-auto">
      <Header />
      <ProductsList />
    </main>
  );
}
