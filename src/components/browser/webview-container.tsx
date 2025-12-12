import type { WebviewTag } from "electron";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import BrowserHeader from "./browser-header";
import WebviewStatus from "./webview-status";

interface WebviewContainerProps {
  id: string;
  title: string;
  url: string;
  className?: string;
  onUrlChange?: (url: string) => void;
  onTitleChange?: (title: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onError?: (error: string) => void;
  initialZoom?: number;
  isActive?: boolean;
}

export const WebviewContainer: React.FC<WebviewContainerProps> = ({
  id,
  title,
  url,
  className,
  onUrlChange,
  onTitleChange,
  onLoadingChange,
  onError,
  initialZoom = 1,
  isActive = true,
}) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isSecure, setIsSecure] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const webviewRef = useRef<WebviewTag>(null);

  const handleDomReady = useCallback(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    webview.setZoomFactor(zoom);

    // Get initial navigation state
    setCanGoBack(webview.canGoBack());
    setCanGoForward(webview.canGoForward());

    // Get page title
    const title = webview.getTitle();
    setCurrentTitle(title);
    onTitleChange?.(title);

    // Get current URL
    const url = webview.getURL();
    setCurrentUrl(url);
    onUrlChange?.(url);

    // Check if URL is secure
    try {
      const urlObj = new URL(url);
      setIsSecure(urlObj.protocol === "https:");
    } catch {
      setIsSecure(false);
    }
  }, [zoom, onUrlChange, onTitleChange]);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");
    onLoadingChange?.(true);
  }, [onLoadingChange]);

  const handleLoadStop = useCallback(() => {
    setIsLoading(false);
    onLoadingChange?.(false);
    setIsConnected(true);
  }, [onLoadingChange]);

  const handleDidFailLoad = useCallback(
    (event: any) => {
      setIsLoading(false);
      setHasError(true);
      setErrorMessage(event.errorDescription || "Gagal memuat halaman");
      setIsConnected(false);
      onError?.(event.errorDescription || "Gagal memuat halaman");
      onLoadingChange?.(false);
    },
    [onError, onLoadingChange],
  );

  const handleDidNavigate = useCallback(
    (event: any) => {
      const newUrl = event.url;
      setCurrentUrl(newUrl);
      onUrlChange?.(newUrl);

      // Check if URL is secure
      try {
        const urlObj = new URL(newUrl);
        setIsSecure(urlObj.protocol === "https:");
      } catch {
        setIsSecure(false);
      }

      // Update navigation state
      const webview = webviewRef.current;
      if (webview) {
        setCanGoBack(webview.canGoBack());
        setCanGoForward(webview.canGoForward());
      }
    },
    [onUrlChange],
  );

  const handleDidNavigateInPage = useCallback((event: any) => {
    const webview = webviewRef.current;
    if (webview) {
      setCanGoBack(webview.canGoBack());
      setCanGoForward(webview.canGoForward());
    }
  }, []);

  const handlePageTitleUpdated = useCallback(
    (event: any) => {
      const newTitle = event.title;
      setCurrentTitle(newTitle);
      onTitleChange?.(newTitle);
    },
    [onTitleChange],
  );

  const handleRefresh = useCallback(() => {
    const webview = webviewRef.current;
    if (webview) {
      webview.reload();
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(zoom + 0.1, 2);
    setZoom(newZoom);
    const webview = webviewRef.current;
    if (webview) {
      webview.setZoomFactor(newZoom);
    }
  }, [zoom]);

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(zoom - 0.1, 0.5);
    setZoom(newZoom);
    const webview = webviewRef.current;
    if (webview) {
      webview.setZoomFactor(newZoom);
    }
  }, [zoom]);

  const handleGoBack = useCallback(() => {
    const webview = webviewRef.current;
    if (webview && canGoBack) {
      webview.goBack();
    }
  }, [canGoBack]);

  const handleGoForward = useCallback(() => {
    const webview = webviewRef.current;
    if (webview && canGoForward) {
      webview.goForward();
    }
  }, [canGoForward]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  useEffect(() => {
    const webview = webviewRef.current;

    if (!webview) return;

    webview.addEventListener("dom-ready", handleDomReady);

    return () => {
      webview.removeEventListener("dom-ready", handleDomReady);
    };
  });

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className,
      )}
    >
      <BrowserHeader
        title={currentTitle}
        url={currentUrl}
        onRefresh={handleRefresh}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
        zoomLevel={zoom}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        isLoading={isLoading}
      />

      <div className="flex items-center justify-between border-gray-100 border-b bg-gray-50 px-4 py-1">
        <WebviewStatus
          isLoading={isLoading}
          isConnected={isConnected}
          isSecure={isSecure}
          hasError={hasError}
          error={errorMessage}
        />

        <div className="text-gray-500 text-xs">ID: {id}</div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <webview
          ref={webviewRef}
          src={url}
          className={cn("h-full w-full", !isActive && "opacity-50")}
          webpreferences="contextIsolation=true"
          useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.3"
        />

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <div className="p-6 text-center">
              <div className="mb-2 text-red-500">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Error: Failed to load page"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-1 font-medium text-gray-900 text-lg">
                Gagal Memuat Halaman
              </h3>
              <p className="mb-4 text-gray-600 text-sm">{errorMessage}</p>
              <button
                type="button"
                onClick={handleRefresh}
                className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebviewContainer;
