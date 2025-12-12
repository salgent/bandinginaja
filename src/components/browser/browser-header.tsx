import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface BrowserHeaderProps {
  title: string;
  url: string;
  onRefresh?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onGoBack?: () => void;
  onGoForward?: () => void;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
  zoomLevel?: number;
  canGoBack?: boolean;
  canGoForward?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const BrowserHeader: React.FC<BrowserHeaderProps> = ({
  title,
  url,
  onRefresh,
  onZoomIn,
  onZoomOut,
  onGoBack,
  onGoForward,
  onToggleFullscreen,
  isFullscreen = false,
  zoomLevel = 1,
  canGoBack = false,
  canGoForward = false,
  isLoading = false,
  className,
}) => {
  const [showUrl, setShowUrl] = useState(false);

  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  };

  const formatZoomLevel = (level: number) => {
    return Math.round(level * 100);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between border-gray-200 border-b bg-white px-4 py-2 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onGoBack}
          disabled={!canGoBack}
          className={cn(
            "rounded-md p-2 transition-colors",
            canGoBack
              ? "text-gray-700 hover:bg-gray-100"
              : "cursor-not-allowed text-gray-300",
          )}
          title="Kembali"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onGoForward}
          disabled={!canGoForward}
          className={cn(
            "rounded-md p-2 transition-colors",
            canGoForward
              ? "text-gray-700 hover:bg-gray-100"
              : "cursor-not-allowed text-gray-300",
          )}
          title="Maju"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className={cn(
            "rounded-md p-2 transition-colors",
            isLoading
              ? "animate-spin text-blue-500"
              : "text-gray-700 hover:bg-gray-100",
          )}
          title="Refresh"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-4 flex-1">
        <div
          className="cursor-pointer truncate font-medium text-gray-900 text-sm hover:text-blue-600"
          onClick={() => setShowUrl(!showUrl)}
          title="Klik untuk melihat URL lengkap"
        >
          {showUrl ? url : title}
        </div>
        {!showUrl && (
          <div className="truncate text-gray-500 text-xs">{formatUrl(url)}</div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-1">
          <button
            type="button"
            onClick={onZoomOut}
            className="rounded p-1 transition-colors hover:bg-gray-200"
            title="Zoom Out"
          >
            <ZoomOut className="h-3 w-3 text-gray-600" />
          </button>
          <span className="min-w-[3rem] text-center text-gray-600 text-xs">
            {formatZoomLevel(zoomLevel)}%
          </span>
          <button
            type="button"
            onClick={onZoomIn}
            className="rounded p-1 transition-colors hover:bg-gray-200"
            title="Zoom In"
          >
            <ZoomIn className="h-3 w-3 text-gray-600" />
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleFullscreen}
          className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100"
          title={isFullscreen ? "Keluar dari fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>

        <button
          type="button"
          onClick={() => window.open(url, "_blank")}
          className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100"
          title="Buka di browser eksternal"
        >
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BrowserHeader;
