import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  BookmarkIcon,
  ChartNoAxesColumnIcon,
  GlobeIcon,
  PackageIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Products",
      icon: PackageIcon,
      path: "/",
    },
    {
      name: "Compare",
      icon: ChartNoAxesColumnIcon,
      path: "/compare",
    },
    {
      name: "Favorites",
      icon: BookmarkIcon,
      path: "/favorites",
    },
  ];

  const bottomMenuItems = [
    {
      name: "Browser",
      icon: GlobeIcon,
      path: "/browser",
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen w-64 flex-col border-gray-200 border-r bg-gray-50">
      <div className="flex items-center px-4 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
          <span className="font-bold text-white text-xl">B</span>
        </div>
        <div className="ml-3">
          <span className="font-semibold text-xl">BandinginAja</span>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.name}
                onClick={() => navigate({ to: item.path })}
                className={cn(
                  "flex w-full cursor-pointer items-center rounded-lg p-3 text-left transition-colors",
                  {
                    "bg-gray-200": isActive(item.path),
                    "hover:bg-gray-100": !isActive(item.path),
                  },
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                <p className="font-medium text-sm">{item.name}</p>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-gray-200 border-t px-4 py-4">
        <ul className="space-y-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.name}
                onClick={() => navigate({ to: item.path })}
                className={cn(
                  "flex w-full cursor-pointer items-center rounded-lg p-3 text-left transition-colors",
                  {
                    "bg-gray-200": isActive(item.path),
                    "hover:bg-gray-100": !isActive(item.path),
                  },
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                <p className="font-medium text-sm">{item.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
