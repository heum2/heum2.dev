"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQuery = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
};
