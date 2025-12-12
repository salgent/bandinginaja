import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { StarIcon } from "lucide-react";
import { Fragment, memo, useMemo } from "react";
import type { CompareProduct, Product } from "@/types";

interface TableCompareProps {
  compareProducts: CompareProduct[];
}

interface FlattenedProduct extends Product {
  baseName: string;
  lowestPrice: number;
  highestPrice: number;
  priceDifference: number;
  platformCount: number;
  groupIndex: number;
  isFirstInGroup: boolean;
}

const TableCompare: React.FC<TableCompareProps> = ({ compareProducts }) => {
  const handleOpenUrl = (url: string) => {
    return window.open(url, "_blank");
  };

  // Flatten the compare products to display each product in a row
  const flattenedData = useMemo(() => {
    return compareProducts.flatMap((group, groupIndex) =>
      group.products.map((product, productIndex) => ({
        ...product,
        baseName: group.baseName,
        lowestPrice: group.lowestPrice,
        highestPrice: group.highestPrice,
        priceDifference: group.priceDifference,
        platformCount: group.platformCount,
        groupIndex,
        isFirstInGroup: productIndex === 0,
      })),
    );
  }, [compareProducts]);

  const columns = useMemo<ColumnDef<FlattenedProduct>[]>(
    () => [
      {
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => (
          <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={row.getValue("imageUrl")}
              alt={row.original.name}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => (
          <div className="max-w-xs">
            <p className="line-clamp-2 font-medium text-sm">
              {row.getValue("name")}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
          const price = row.getValue("price") as string;
          const originalPrice = row.original.originalPrice;

          return (
            <div className="flex flex-col">
              <p className="font-semibold text-sm">
                {Number(price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
              {originalPrice && Number(originalPrice) !== 0 && (
                <p className="font-medium text-gray-500 text-xs line-through decoration-gray-400">
                  {Number(originalPrice).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => {
          const rating = row.getValue("rating") as string;
          return (
            <div className="flex items-center gap-1">
              <StarIcon
                className="h-4 w-4 text-yellow-400"
                fill="currentColor"
              />
              <p className="font-medium text-xs">{rating || "0.0"}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "soldCount",
        header: "Sales",
        cell: ({ row }) => (
          <p className="text-sm">{row.getValue("soldCount")}</p>
        ),
      },
      {
        accessorKey: "shopName",
        header: "Shop Name",
        cell: ({ row }) => (
          <p className="text-sm">{row.getValue("shopName")}</p>
        ),
      },
      {
        accessorKey: "shopLocation",
        header: "Location",
        cell: ({ row }) => (
          <p className="text-sm">{row.getValue("shopLocation")}</p>
        ),
      },
      {
        accessorKey: "platform",
        header: "Platform",
        cell: ({ row }) => (
          <p className="text-sm capitalize">{row.getValue("platform")}</p>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: flattenedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative h-[calc(100vh-100px)] w-full overflow-auto px-8 pb-8">
      <table className="border border-gray-100 bg-white">
        <thead className="-top-px sticky z-30 bg-gray-50 shadow-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {table.getRowModel().rows.map((row) => {
            const product = row.original;
            const group = compareProducts[product.groupIndex];

            return (
              <Fragment key={row.id}>
                {product.isFirstInGroup && (
                  <tr className="bg-gray-50">
                    <td colSpan={columns.length} className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {group.baseName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-600">
                              Lowest Price:
                            </span>
                            <span className="font-semibold text-green-600">
                              {group.lowestPrice.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-600">
                              Highest Price:
                            </span>
                            <span className="font-semibold text-red-600">
                              {group.highestPrice.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-600">
                              Price Difference:
                            </span>
                            <span className="font-semibold text-orange-600">
                              {group.priceDifference.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-600">
                              Product Similarity:
                            </span>
                            <span className="font-semibold text-blue-600">
                              {group.platformCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOpenUrl(product.url || "")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default memo(TableCompare);
