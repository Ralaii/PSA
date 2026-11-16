import { useCallback } from "react";
import { useSearchParams } from "react-router";

export function useQueryParams(defaults) {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = {};
  for (const key of Object.keys(defaults)) {
    values[key] = searchParams.get(key) ?? defaults[key];
  }

  const set = useCallback(
    (key, value) =>
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === defaults[key]) next.delete(key);
          else next.set(key, value);
          return next;
        },
        { replace: true }
      ),
    [setSearchParams, defaults]
  );

  const resetKey = Object.values(values).join("|");

  return { values, set, resetKey };
}