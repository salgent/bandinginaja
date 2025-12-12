import {
  Loader2,
  Package,
  ShoppingBag,
  ShoppingCart,
  Store,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface Marketplace {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

interface MarketplaceTabsProps {
  marketplaces: Marketplace[];
  activeMarketplace: string;
  onMarketplaceChange: (id: string) => void;
  onMarketplaceDelete?: (id: string) => void;
  onMarketplaceAdd?: () => void;
  loadingStates?: Record<string, boolean>;
  deviceMode?: "desktop" | "tablet" | "mobile";
  onDeviceModeChange?: (mode: "desktop" | "tablet" | "mobile") => void;
  className?: string;
}

const defaultMarketplaces: Marketplace[] = [
  {
    id: "tokopedia",
    name: "Tokopedia",
    url: "https://www.tokopedia.com",
    icon: <ShoppingCart className="h-4 w-4" />,
    color: "bg-green-500",
  },
  {
    id: "shopee",
    name: "Shopee",
    url: "https://shopee.co.id",
    icon: <Store className="h-4 w-4" />,
    color: "bg-orange-500",
  },
  {
    id: "lazada",
    name: "Lazada",
    url: "https://www.lazada.co.id",
    icon: <Package className="h-4 w-4" />,
    color: "bg-blue-500",
  },
  {
    id: "blibli",
    name: "Blibli",
    url: "https://www.blibli.com/",
    icon: <ShoppingBag className="h-4 w-4" />,
    color: "bg-red-500",
  },
];

export const MarketplaceTabs: React.FC<MarketplaceTabsProps> = ({
  marketplaces = defaultMarketplaces,
  activeMarketplace,
  onMarketplaceChange,
  onMarketplaceDelete,
  onMarketplaceAdd,
  loadingStates = {},
  deviceMode = "desktop",
  onDeviceModeChange,
  className,
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div className={cn("border-gray-200 border-b bg-white", className)}>
      <div className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-1">
          {marketplaces.map((marketplace) => {
            const isActive = activeMarketplace === marketplace.id;
            const isLoading = loadingStates[marketplace.id] || false;
            const isHovered = hoveredTab === marketplace.id;

            return (
              <button
                key={marketplace.id}
                type="button"
                onClick={() => onMarketplaceChange(marketplace.id)}
                onMouseEnter={() => setHoveredTab(marketplace.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative flex items-center gap-2 rounded-md px-4 py-2 transition-all duration-200",
                  isActive
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full",
                    isActive ? marketplace.color : "bg-gray-300",
                  )}
                >
                  <div className="text-white">{marketplace.icon}</div>
                </div>

                <span className="font-medium text-sm">{marketplace.name}</span>

                {isLoading && (
                  <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                )}

                {isActive && (
                  <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-blue-500" />
                )}

                {isHovered && !isActive && (
                  <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-gray-300" />
                )}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center space-x-2">
          {/* <button
            type="button"
            className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title="Tambah Marketplace"
          >
            <Globe className="h-4 w-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceTabs;
