import { AlertCircle, Loader2, Lock, Unlock, WifiOff } from "lucide-react";
import { cn } from "@/utils/cn";

interface WebviewStatusProps {
  isLoading?: boolean;
  isConnected?: boolean;
  isSecure?: boolean;
  hasError?: boolean;
  error?: string;
  className?: string;
}

export const WebviewStatus: React.FC<WebviewStatusProps> = ({
  isLoading = false,
  isConnected = true,
  isSecure = true,
  hasError = false,
  error,
  className,
}) => {
  const getStatusColor = () => {
    if (hasError) return "text-red-500";
    if (isLoading) return "text-blue-500";
    if (isConnected) return "text-green-500";
    return "text-gray-400";
  };

  const getStatusText = () => {
    if (hasError) return error || "Terjadi kesalahan";
    if (isLoading) return "Memuat...";
    if (isConnected) return isSecure ? "Aman" : "Tidak Aman";
    return "Tidak terhubung";
  };

  const getStatusIcon = () => {
    if (hasError) return <AlertCircle className="h-3 w-3" />;
    if (isLoading) return <Loader2 className="h-3 w-3 animate-spin" />;
    if (isConnected)
      return isSecure ? (
        <Lock className="h-3 w-3" />
      ) : (
        <Unlock className="h-3 w-3" />
      );
    return <WifiOff className="h-3 w-3" />;
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-1 text-xs",
        getStatusColor(),
        className,
      )}
    >
      {getStatusIcon()}
      <span className="max-w-[100px] truncate">{getStatusText()}</span>
    </div>
  );
};

export default WebviewStatus;
