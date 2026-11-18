import Spinner from "./Spinner";

function SpinnerOverlay({ message }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm"
    >
      <Spinner />
      {message && <p className="text-sm text-white/80">{message}</p>}
    </div>
  );
}

export default SpinnerOverlay;