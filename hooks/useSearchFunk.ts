// hooks/useSearchFunk.ts
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useSearchFunk = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams.get("search") || "";
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
        
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`);
  }, [value, router, searchParams]);

  return {
    value,
    setValue,
    handleClick,
  };
};

export default useSearchFunk;
