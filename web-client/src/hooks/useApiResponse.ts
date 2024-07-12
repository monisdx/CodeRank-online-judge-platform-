import { useEffect, useRef, useState } from "react";

export default function useApiResponse<
  T extends (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>,
>(call: T, ...args: Parameters<T>) {
  const [data, setData] = useState<Awaited<ReturnType<T>>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const flag = useRef(false);

  async function loadData() {
    setLoading(true);

    try {
      const response = await call(...args);
      setData(response);
    } catch (err) {
      if (typeof err === "string") setError(new Error(err));
      else if (err instanceof Error) setError(err);
      else setError(new Error("Unable to load data"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      loadData();
    }
  }, []);

  return { data, loading, error, refetch: loadData };
}
