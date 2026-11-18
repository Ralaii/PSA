import { WifiOff, X } from "lucide-react";

function ServerDownBanner({ onRetry, onDismiss, retrying = false }) {
  return (
    <div
      role="alert"
      className="fixed inset-x-0 top-0 z-[70] flex items-center justify-center gap-3 bg-black px-12 py-2.5 text-sm text-white shadow-md"
    >
      <WifiOff size={16} className="shrink-0" />
      <span>The server is down. Some features won't work right now.</span>

      <button
        type="button"
        onClick={onRetry}
        disabled={retrying}
        className="cursor-pointer rounded bg-white/20 px-2 py-0.5 font-medium transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {retrying ? "Retrying..." : "Retry"}
      </button>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded transition hover:bg-white/20"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default ServerDownBanner;