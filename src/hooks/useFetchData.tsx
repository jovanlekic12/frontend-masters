import { useEffect, useState } from "react";

export function useFetchData<T>(...fetchHandlers: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const promises = fetchHandlers.map((fn) => fn());
      const results = await Promise.all(promises);
      console.log(results);
      setData(results);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return { isLoading, data, error };
}
