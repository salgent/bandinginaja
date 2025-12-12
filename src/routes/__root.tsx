import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "@/components/sidebar/sidebar";
import ListWebview from "@/components/webview/list-webview";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div>
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
      <ListWebview />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
