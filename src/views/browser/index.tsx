import type React from "react";
import Webview from "@/components/webview/webview";

const WEBVIEW_URLS = [
  "https://www.tokopedia.com",
  "https://shopee.co.id",
  "https://www.lazada.co.id",
];
const Browser: React.FC = () => {
  return (
    <div className="flex h-screen gap-5 p-8">
      {WEBVIEW_URLS.map((url) => (
        <Webview key={url} src={url} className="h-full" zoom={1} visible />
      ))}
    </div>
  );
};

export default Browser;
