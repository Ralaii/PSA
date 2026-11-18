import { useQuery } from "@tanstack/react-query"
import { getMeRequest } from "../services/authService"

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeRequest,
    staleTime: 5 * 60 * 1000,
    retry: false
  })
}