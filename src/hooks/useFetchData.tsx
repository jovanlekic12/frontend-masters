import { useEffect, useState } from "react";

export function useFetchData<T>(fetchHandler: () => Promise<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let isMounted = true;

    const fetchedData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchHandler();
        if (isMounted) {
          setData(response);
        }
      } catch (err: any) {
        console.error("Fetching error:", err);
        setError(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchedData();

    return () => {
      isMounted = false;
    };
  }, [fetchHandler]);

  return { isLoading, data, error };
}
