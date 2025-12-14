import type { WebviewTag } from "electron";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

interface WebviewProps {
  src: string;
  executeJavaScript?: string;
  className?: string;
  onGetHtml?: (html: string) => void;
  visible?: boolean;
  zoom?: number;
}

export const Webview: React.FC<WebviewProps> = (props) => {
  const {
    src,
    executeJavaScript = "",
    visible = false,
    zoom = 0.1,
    onGetHtml,
  } = props;

  const webviewRef = useRef<WebviewTag>(null);

  const handleDomReady = useCallback(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    webview.setZoomFactor(zoom);
    webview
      .executeJavaScript(executeJavaScript)
      .then((html: string) => {
        onGetHtml?.(html);
      })
      .catch((error: Error) => {
        console.error("Error executing JavaScript:", error);
      });
  }, [onGetHtml, executeJavaScript, zoom]);

  useEffect(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    webview.addEventListener("dom-ready", handleDomReady);

    return () => {
      webview.removeEventListener("dom-ready", handleDomReady);
    };
  }, [handleDomReady]);

  return (
    <webview
      ref={webviewRef}
      src={src}
      className={cn(
        "-z-50 absolute h-screen w-screen opacity-0",
        { "relative z-50 h-screen w-full opacity-100": visible },
        props.className,
      )}
      webpreferences="contextIsolation=true"
      useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.3"
    />
  );
};

export default Webview;
