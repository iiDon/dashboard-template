import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type SearchParams = { [key: string]: string };

const useAllSearchParams = (): SearchParams => {
  const [allParams, setAllParams] = useState<SearchParams>({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params: SearchParams = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    setAllParams(params);
  }, [searchParams]);

  return allParams;
};

export { useAllSearchParams };
