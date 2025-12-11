import type { WebviewTag } from "electron";
import { useCallback, useEffect, useRef } from "react";

interface WebviewProps {
  src: string;
  executeJavaScript?: string;
  className?: string;
  onGetHtml?: (html: string) => void;
}

export const Webview: React.FC<WebviewProps> = (props) => {
  const { src, executeJavaScript = "", onGetHtml } = props;

  const webviewRef = useRef<WebviewTag>(null);

  const handleDomReady = useCallback(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    webview.setZoomFactor(0.1);
    webview
      .executeJavaScript(executeJavaScript)
      .then((html: string) => {
        onGetHtml?.(html);
      })
      .catch((error: Error) => {
        console.error("Error executing JavaScript:", error);
      });
  }, [onGetHtml, executeJavaScript]);

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
      className="-z-50 absolute h-[80vh] w-[80vw] opacity-0"
      // className="h-[80vh] w-full"
      nodeintegration={false}
      webpreferences="contextIsolation=true"
      useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.3"
    />
  );
};

export default Webview;
