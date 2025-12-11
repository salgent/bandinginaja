import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "@/components/sidebar/sidebar";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"> */}
        <div>
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
