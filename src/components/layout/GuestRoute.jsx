import { Navigate, Outlet, useLocation } from "react-router";
import { useMe } from "../../hooks/useMe";

function GuestRoute() {
  const { data: me, isLoading } = useMe();
  const state = useLocation().state;
  const from = state?.from ? state.from.pathname + state.from.search : "/dashboard";

  if (isLoading) return <div>Loading...</div>;
  if (me) return <Navigate to={from} replace />;

  return <Outlet />;
}

export default GuestRoute;