import { useEffect, useState } from "react";

type fetchHandler = {
  handler: () => void;
};

export function useFetchData(...fetchHandlers: fetchHandler[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const promises = fetchHandlers.map((fn) => fn.handler());
      const results = await Promise.all(promises);
      console.log(results);
      setData(results);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return { isLoading, data };
}
