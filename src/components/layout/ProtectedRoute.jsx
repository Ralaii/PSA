import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "../../hooks/useMe";
import ServerErrorModal from "../ui/ServerErrorModal";
import ServerDownBanner from "../ui/ServerDownBanner";
import Spinner from "../ui/Spinner";

function ProtectedRoute({ roles }) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [stopped, setStopped] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const {
    data: me, isLoading, isError, error, isFetching, failureCount, refetch,
  } = useMe({ enabled: !stopped });

  const handleStop = () => {
    setStopped(true);
    setBannerDismissed(false);
    queryClient.cancelQueries({ queryKey: ["me"] });
  };

  const handleRetry = () => {
    setStopped(false);
    setBannerDismissed(false);
    refetch();
  };

  if (me) {
    if (roles && !roles.includes(me.role)) return <Navigate to="/dashboard" replace />;
    return <Outlet />;
  }

  if (me === null) {
    return <Navigate to={"/login"} state={{from: location}} replace/>
  }

  if (error?.status === 401) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (stopped) {
    return (
      <>
        {!bannerDismissed && (
          <ServerDownBanner
            onRetry={handleRetry}
            onDismiss={() => setBannerDismissed(true)}
            retrying={isFetching}
          />
        )}
        <div className="flex h-screen flex-col items-center justify-center gap-3 text-center">
          <p className="text-lg font-semibold">The server is down</p>
          <button
            type="button"
            onClick={handleRetry}
            className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900"
          >
            Try again
          </button>
        </div>
      </>
    );
  }

  if (isLoading && failureCount === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <ServerErrorModal
      onRetry={handleRetry}
      onStop={handleStop}
      retrying={isFetching}
    />
  );
}

export default ProtectedRoute;