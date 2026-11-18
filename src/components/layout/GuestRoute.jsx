import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "../../hooks/useMe";
import SpinnerOverlay from "../ui/SpinnerOverlay";
import ServerErrorModal from "../ui/ServerErrorModal";
import ServerDownBanner from "../ui/ServerDownBanner";

function GuestRoute() {
  const queryClient = useQueryClient();
  const [stopped, setStopped] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const {
    data: me, isLoading, isError, error, isFetching, failureCount, refetch,
  } = useMe({ enabled: !stopped });

  const state = useLocation().state;
  const from = state?.from ? state.from.pathname + state.from.search : "/dashboard";

  if (me) return <Navigate to={from} replace />;

  const serverDown = isError && (error.isNetworkError || error.status >= 500);
  const showModal = !stopped && (serverDown || (isLoading && failureCount > 0));
  const showBanner = stopped && !bannerDismissed;

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

  return (
    <>
      <Outlet />

      {isLoading && failureCount === 0 && !stopped && <SpinnerOverlay />}

      {showModal && (
        <ServerErrorModal
          onRetry={handleRetry}
          onStop={handleStop}
          retrying={isFetching}
          showLogin={false}
        />
      )}

      {showBanner && (
        <ServerDownBanner
          onRetry={handleRetry}
          onDismiss={() => setBannerDismissed(true)}
          retrying={isFetching}
        />
      )}
    </>
  );
}

export default GuestRoute;