import { Navigate, Outlet, useLocation } from "react-router";
import { useMe } from "../../hooks/useMe";
import ServerErrorModal from "../ui/ServerErrorModal";
import FullPageSpinner from "../ui/FullPageSpinner";

function ProtectedRoute({ roles }) {
  const { data: me, isLoading, isError, refetch, isFetching } = useMe();
  const location = useLocation();

  if (isLoading) return <FullPageSpinner />;

  if (isError && !me) return <ServerErrorModal onRetry={refetch} retrying={isFetching} />;

  if (!me) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(me.role)) return <Navigate to="/dashboard" replace />;

  return (
    <>
      {isError && <ConnectionBanner onRetry={refetch} retrying={isFetching} />}
      <Outlet />
    </>
  );
}

export default ProtectedRoute;