import { useVirtualizer } from "@tanstack/react-virtual";
import { LayoutGrid, ListChevronsUpDownIcon, Table } from "lucide-react";
import { Activity, useEffect, useRef, useState } from "react";
import CardProduct from "@/components/card/card-product";
import TableCompare from "@/components/table/table-compare";
import Select from "@/components/ui/select";
import ToggleGroup from "@/components/ui/toggle-group";
import { useCompareProducts, useProductActions } from "@/stores/store-product";

const SIMILAR_RATIOS = [
  { label: "10%", value: 0.1 },
  { label: "20%", value: 0.2 },
  { label: "30%", value: 0.3 },
  { label: "40%", value: 0.4 },
  { label: "50%", value: 0.5 },
  { label: "60%", value: 0.6 },
  { label: "70%", value: 0.7 },
  { label: "80%", value: 0.8 },
  { label: "90%", value: 0.9 },
];

const Compare = () => {
  const compareProducts = useCompareProducts();
  const { setCompareProducts, setSimilarity } = useProductActions();
  const [viewMode, setViewMode] = useState("card");

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: compareProducts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 1000,
    overscan: 5,
    measureElement: (element) =>
      element?.getBoundingClientRect().height ?? 1000,
  });

  useEffect(() => {
    if (compareProducts.length !== 0) return;
    setCompareProducts();
  }, [setCompareProducts, compareProducts.length]);

  useEffect(() => {
    if (rowVirtualizer) {
      rowVirtualizer.scrollToIndex(0);
    }
  }, [rowVirtualizer]);

  if (!compareProducts) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">
          No products to compare. Please search for products first.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="flex items-center justify-between gap-5 px-8 pt-8 pb-4">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">
            Product Comparison
          </h2>
          <p className="text-gray-500 text-sm">
            Total results ({compareProducts.length})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ToggleGroup
            options={[
              { label: <LayoutGrid className="h-4 w-4" />, value: "card" },
              { label: <Table className="h-4 w-4" />, value: "table" },
            ]}
            value={viewMode}
            onChange={setViewMode}
          />

          <Select
            icon={<ListChevronsUpDownIcon />}
            options={SIMILAR_RATIOS}
            defaultValue={0.5}
            onValueChange={setSimilarity}
          />
        </div>
      </div>

      {compareProducts.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">
            No products to compare. Please search for products first.
          </p>
        </div>
      ) : (
        <div className="h-full">
          <Activity mode={viewMode === "card" ? "visible" : "hidden"}>
            <div
              ref={parentRef}
              className="h-full overflow-auto px-8 contain-strict"
            >
              <div
                className="relative w-full"
                style={{ height: rowVirtualizer.getTotalSize() }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                  const group = compareProducts[virtualItem.index];
                  return (
                    <div
                      key={virtualItem.key}
                      data-index={virtualItem.index}
                      ref={(el) => {
                        if (el) {
                          rowVirtualizer.measureElement(el);
                        }
                      }}
                      className="absolute top-0 left-0 w-full"
                      style={{
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <div className="mb-2">
                        <div className="mb-4 rounded-lg bg-gray-50 p-4">
                          <h2 className="mb-2 font-semibold text-gray-900 text-lg">
                            {group.baseName}
                          </h2>
                          <div className="flex flex-wrap gap-4 text-sm">
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

                        <div className="grid grid-cols-8 gap-5">
                          {group.products.map((product) => (
                            <CardProduct key={product.url} product={product} />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Activity>

          <Activity mode={viewMode === "card" ? "hidden" : "visible"}>
            <div className="relative h-full overflow-auto">
              <TableCompare compareProducts={compareProducts} />
            </div>
          </Activity>
        </div>
      )}
    </div>
  );
};

export default Compare;
