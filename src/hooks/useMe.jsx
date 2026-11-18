import { useQuery } from "@tanstack/react-query";
import { getMeRequest } from "../services/authService";

const MAX_RETRIES = 3;

export function useMe(options = {}) {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeRequest,
    staleTime: 0,
    refetchOnMount: "always",
    retry: (count, err) =>
      count < MAX_RETRIES && (err.isNetworkError || err.status >= 500),
    retryDelay: (attempt) => Math.min(500 * 2 ** attempt, 2000),
    networkMode: "always",
    ...options,
  });
}