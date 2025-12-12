import { useCallback, useState } from "react";
import MarketplaceTabs from "@/components/browser/marketplace-tabs";
import WebviewContainer from "@/components/browser/webview-container";
import { cn } from "@/utils/cn";

interface Marketplace {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const defaultMarketplaces: Marketplace[] = [
  {
    id: "tokopedia",
    name: "Tokopedia",
    url: "https://www.tokopedia.com",
    icon: null,
    color: "bg-green-500",
  },
  {
    id: "shopee",
    name: "Shopee",
    url: "https://shopee.co.id",
    icon: null,
    color: "bg-orange-500",
  },
  {
    id: "lazada",
    name: "Lazada",
    url: "https://www.lazada.co.id",
    icon: null,
    color: "bg-blue-500",
  },
  {
    id: "blibli",
    name: "Blibli",
    url: "https://www.blibli.com/",
    icon: null,
    color: "bg-red-500",
  },
];

const Browser = () => {
  const [activeMarketplace, setActiveMarketplace] = useState("tokopedia");
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const handleMarketplaceChange = useCallback((id: string) => {
    setActiveMarketplace(id);
  }, []);

  const handleLoadingChange = useCallback(
    (marketplaceId: string, isLoading: boolean) => {
      setLoadingStates((prev) => ({
        ...prev,
        [marketplaceId]: isLoading,
      }));
    },
    [],
  );

  const getDeviceDimensions = () => {
    switch (deviceMode) {
      case "mobile":
        return { width: "375px", height: "667px" };
      case "tablet":
        return { width: "768px", height: "1024px" };
      default:
        return { width: "100%", height: "100%" };
    }
  };

  const deviceDimensions = getDeviceDimensions();

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="border-gray-200 border-b bg-white shadow-sm">
        <MarketplaceTabs
          marketplaces={defaultMarketplaces}
          activeMarketplace={activeMarketplace}
          onMarketplaceChange={handleMarketplaceChange}
          loadingStates={loadingStates}
        />

        {/* <div className="flex items-center justify-end border-gray-100 border-t bg-gray-50 px-4 py-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">Perangkat:</span>
            <div className="flex items-center rounded-md border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={cn(
                  "rounded p-1.5 transition-colors",
                  deviceMode === "desktop"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900",
                )}
                title="Desktop"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("tablet")}
                className={cn(
                  "rounded p-1.5 transition-colors",
                  deviceMode === "tablet"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900",
                )}
                title="Tablet"
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("mobile")}
                className={cn(
                  "rounded p-1.5 transition-colors",
                  deviceMode === "mobile"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900",
                )}
                title="Mobile"
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="h-full">
          {(() => {
            const activeMarketplaceData = defaultMarketplaces.find(
              (m) => m.id === activeMarketplace,
            );

            if (!activeMarketplaceData) return null;

            return (
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  deviceMode !== "desktop" && "mx-auto",
                )}
                style={{
                  width:
                    deviceMode !== "desktop" ? deviceDimensions.width : "100%",
                  maxWidth:
                    deviceMode !== "desktop" ? deviceDimensions.width : "none",
                  height: deviceDimensions.height,
                }}
              >
                <WebviewContainer
                  id={activeMarketplaceData.id}
                  title={activeMarketplaceData.name}
                  url={activeMarketplaceData.url}
                  isActive={true}
                  onLoadingChange={(isLoading) =>
                    handleLoadingChange(activeMarketplaceData.id, isLoading)
                  }
                  className="h-full"
                />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Browser;
