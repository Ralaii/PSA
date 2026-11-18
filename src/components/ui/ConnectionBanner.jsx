import { WifiOff } from "lucide-react";

function ConnectionBanner({ onRetry, retrying = false }) {
  return (
    <div
      role="alert"
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-center gap-3 bg-red-300 px-4 py-2 text-sm text-white"
    >
      <WifiOff size={16} />
      <span>Connection lost. Some data may be out of date.</span>
      <button
        type="button"
        onClick={onRetry}
        disabled={retrying}
        className="cursor-pointer rounded bg-white/20 px-2 py-0.5 font-medium transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {retrying ? "Retrying..." : "Retry"}
      </button>
    </div>
  );
}

export default ConnectionBanner;