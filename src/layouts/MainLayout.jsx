import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useSidebarState } from "../hooks/useSidebarState";

function MainLayout() {
  const { 
    collapsed, 
    setCollapsed, 
    mobileOpen, 
    setMobileOpen 
  } = useSidebarState();

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* Dims the page behind the phone drawer */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}
    </div>
  );
}

export default MainLayout;