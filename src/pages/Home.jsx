import { useMe } from "../hooks/useMe";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "./Dashboard";
import Login from "./Login";
import AuthLayout from "../components/layout/AuthLayout";
import FullPageSpinner from "../components/ui/FullPageSpinner";

function Home() {
  const { data: me, isLoading, isError } = useMe();

  if (isLoading) return <FullPageSpinner />;
  if (isError) return <div>Cannot reach the server.</div>;

  return me ? (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  ) : (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}

export default Home;