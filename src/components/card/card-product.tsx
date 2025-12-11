import { StarIcon } from "lucide-react";
import { memo } from "react";
import type { Product } from "@/types";

interface CardProductProps {
  product: Product;
}

const CardProduct: React.FC<CardProductProps> = (props) => {
  const { product } = props;

  const handleOpenUrl = () => {
    return window.open(product.url, "_blank");
  };

  return (
    <div className="flex cursor-pointer flex-col gap-1" onClick={handleOpenUrl}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full rounded-lg object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>

      <p className="line-clamp-2 font-medium text-xs">{product.name}</p>

      <p className="flex flex-wrap items-center gap-0.5 font-semibold text-gray-900 text-sm">
        {Number(product.price).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}

        {product.originalPrice && Number(product.originalPrice) !== 0 && (
          <span className="font-medium text-gray-500 text-xs line-through decoration-gray-400">
            {Number(product.originalPrice).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        )}
      </p>

      <div className="flex flex-wrap items-center gap-1">
        {product.rating && (
          <>
            <StarIcon className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <p className="font-medium text-gray-500 text-xs">
              {product.rating}
            </p>
            <p className="text-gray-300 text-xs">•</p>
          </>
        )}
        <p className="font-medium text-gray-500 text-xs">{product.soldCount}</p>
      </div>

      <p className="text-gray-500 text-xs">{product.shopName}</p>
    </div>
  );
};

export default memo(CardProduct);
