import { useState } from "react";
import { Check, Copy } from "lucide-react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy"
      className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

export default function Field({ label, value, href, mono, copyable }) {
  const text = value || "";

  return (
    <div className="flex items-start justify-between gap-3 border-b-0 pb-4 dark:border-b">
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className={`mt-1 truncate text-sm font-medium ${mono ? "font-mono" : ""}`}>
          {!text ? (
            "—"
          ) : href ? (
            <a href={href} className="text-blue-600 hover:underline dark:text-blue-400">
              {text}
            </a>
          ) : (
            text
          )}
        </dd>
      </div>
      {copyable && text && <CopyButton text={text} />}
    </div>
  );
}