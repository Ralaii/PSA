import { WifiOff } from "lucide-react";
import { Link } from "react-router";
import Modal from "./Modal";

function ServerErrorModal({
  onRetry,
  onStop,
  retrying = false,
  stopped = false,
  showLogin = true,
}) {
  const outlineBtn =
    "w-full cursor-pointer rounded-lg border border-zinc-300 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800";

  return (
    <Modal role="alertdialog" labelledBy="server-error-title" className="text-center">
      <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
        <WifiOff size={22} />
      </div>
      <h2 id="server-error-title" className="text-lg font-semibold">
        {stopped ? "Reconnecting stopped" : "Cannot reach the server"}
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {stopped
          ? "We stopped trying to reach the server. You can try again whenever you're ready."
          : "Please check your connection or try again in a moment."}
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="w-full cursor-pointer rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {retrying ? "Retrying..." : "Try again"}
        </button>

        {onStop && (
          <button type="button" onClick={onStop} className={outlineBtn}>
            {retrying ? "Stop trying" : "Close"}
          </button>
        )}

        {showLogin && (
          <Link to="/login" replace className={`${outlineBtn} block`}>
            Back to login
          </Link>
        )}
      </div>
    </Modal>

  );
}

export default ServerErrorModal;