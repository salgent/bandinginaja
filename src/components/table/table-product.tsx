import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { StarIcon } from "lucide-react";
import { memo } from "react";
import type { Product } from "@/types";

interface TableProductProps {
  products: Product[];
}

const TableProduct: React.FC<TableProductProps> = ({ products }) => {
  const handleOpenUrl = (url: string) => {
    return window.open(url, "_blank");
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={row.getValue("imageUrl")}
            alt={row.getValue("name")}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <p className="line-clamp-2 font-medium text-sm">
          {row.getValue("name")}
        </p>
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
            <StarIcon className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <p className="font-medium text-xs">{rating || "0.0"}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "soldCount",
      header: "Sales",
      cell: ({ row }) => <p className="text-sm">{row.getValue("soldCount")}</p>,
    },
    {
      accessorKey: "shopName",
      header: "Shop Name",
      cell: ({ row }) => <p className="text-sm">{row.getValue("shopName")}</p>,
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
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="min-w-full border border-gray-100 bg-white">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
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
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleOpenUrl(row.original.url || "")}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(TableProduct);
