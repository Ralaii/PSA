import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { previewCoe } from "@/services/hrService";

export function useCoePreview(employeeNumber) {
  const [url, setUrl] = useState(null);
  const urlRef = useRef(null);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (body) => previewCoe(employeeNumber, body),
    onSuccess: (blob) => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = URL.createObjectURL(blob);
      setUrl(urlRef.current);
    },
  });

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    []
  );

  return { url, isPending, error, generate: mutate };
}