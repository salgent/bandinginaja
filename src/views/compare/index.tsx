import { Select } from "@base-ui-components/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { CheckIcon, ListChevronsUpDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CardProduct from "@/components/card/card-product";
import { useCompareProducts, useProductActions } from "@/stores/store-product";

interface CompareProductGroup {
  groupIndex: number;
  baseName: string;
  products: any[];
  lowestPrice: number;
  highestPrice: number;
  priceDifference: number;
  platformCount: number;
  productCards: Array<{
    index: number;
    name: string;
    platform: string;
    imageUrl?: string;
    shopName: string;
    url?: string;
    price: string;
    rating: string;
    soldCount: string;
    shopLocation: string;
    originalPrice: string;
  }>;
}

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
  const compareProducts =
    useCompareProducts() as unknown as CompareProductGroup[];
  const { setCompareProducts } = useProductActions();
  const [similar, setSimilar] = useState(0.5);

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: compareProducts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
  });

  useEffect(() => {
    setCompareProducts(similar);
  }, [setCompareProducts, similar]);

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
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 text-xl">
              Product Comparison
            </h2>
            <p className="text-gray-500 text-sm">
              Total results ({compareProducts.length})
            </p>
          </div>

          <Select.Root
            items={SIMILAR_RATIOS}
            defaultValue={0.5}
            onValueChange={(value) => setSimilar(Number(value))}
          >
            <Select.Trigger className="focus-visible:-outline-offset-1 flex h-10 min-w-20 select-none items-center justify-between gap-3 rounded-md border border-gray-200 bg-[canvas] pr-3 pl-3.5 text-base text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 data-[popup-open]:bg-gray-100">
              <Select.Value />
              <Select.Icon className="flex">
                <ListChevronsUpDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner
                className="z-10 select-none outline-none"
                sideOffset={8}
              >
                <Select.Popup className="group min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-md bg-[canvas] bg-clip-padding text-gray-900 shadow-gray-200 shadow-lg outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[ending-style]:transition-none data-[side=none]:data-[starting-style]:transition-none data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none dark:outline-gray-300">
                  <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:top-[-100%]" />
                  <Select.List className="relative max-h-[var(--available-height)] scroll-py-6 overflow-y-auto py-1">
                    {SIMILAR_RATIOS.map(({ label, value }) => (
                      <Select.Item
                        key={label}
                        value={value}
                        className="grid cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2 pointer-coarse:py-2.5 py-2 pr-4 pl-2.5 pointer-coarse:text-[0.925rem] text-sm leading-4 outline-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900 group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4"
                      >
                        <Select.ItemIndicator className="col-start-1">
                          <CheckIcon className="size-3" />
                        </Select.ItemIndicator>
                        <Select.ItemText className="col-start-2">
                          {label}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.List>
                  <Select.ScrollDownArrow className="bottom-0 bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:bottom-[-100%]" />
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      <div ref={parentRef} className="h-[calc(100vh-10rem)] overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const group = compareProducts[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className="mb-8">
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
                          Platforms:
                        </span>
                        <span className="font-semibold text-blue-600">
                          {group.platformCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-5">
                    {group.productCards.map((product) => (
                      <CardProduct key={product.url} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {compareProducts.length === 0 && (
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-500">
            No products to compare. Please search for products first.
          </p>
        </div>
      )}
    </div>
  );
};

export default Compare;
