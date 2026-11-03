import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useSidebarCollapse } from "../hooks/useSideBarCollapse";

function MainLayout() {
  const [collapsed, setCollapsed] = useSidebarCollapse();

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Phones: fixed width (viewport minus the 5rem collapsed sidebar), so an
          opened sidebar pushes this off-screen instead of squeezing it */}
      <div className="relative flex w-[calc(100%-5rem)] shrink-0 flex-col md:w-auto md:min-w-0 md:flex-1 md:shrink">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          <Outlet />
        </main>

        {/* Dim the pushed page; phones only */}
        {!collapsed && (
          <div
            aria-hidden="true"
            onClick={() => setCollapsed(true)}
            className="absolute inset-0 z-10 bg-black/40 md:hidden"
          />
        )}
      </div>
    </div>
  );
}

export default MainLayout;