import { useVirtualizer } from "@tanstack/react-virtual";
import { LayoutGridIcon, SearchIcon, TableIcon } from "lucide-react";
import type { BaseUIEvent } from "node_modules/@base-ui-components/react/utils/types";
import type React from "react";
import {
  Activity,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CardProduct from "@/components/card/card-product";
import TableProduct from "@/components/table/table-product";
import Input from "@/components/ui/input";
import ToggleGroup from "@/components/ui/toggle-group";
import {
  useProductActions,
  useProducts,
  useSearch,
} from "@/stores/store-product";

const OPTIONS_VIEW = [
  {
    label: <LayoutGridIcon className="h-4 w-4" />,
    value: "grid",
  },
  {
    label: <TableIcon className="h-4 w-4" />,
    value: "table",
  },
];

export const Home: React.FC = () => {
  const [viewMode, setViewMode] = useState("grid");
  const search = useSearch();
  const products = useProducts();
  const { setSearch } = useProductActions();
  const parentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [columns, setColumns] = useState(6);

  // Minimum width for each column (including gap)
  const MIN_COLUMN_WIDTH = 200; // pixels

  const handleSearch = (
    event: BaseUIEvent<KeyboardEvent<HTMLInputElement>>,
  ) => {
    if (event.key === "Enter") {
      setSearch(event.currentTarget.value);
    }
  };

  // Calculate number of columns based on container width
  const calculateColumns = useCallback((width: number) => {
    if (width === 0) return 6;
    // Calculate how many columns can fit with gaps
    const gapWidth = 20; // tailwind gap-5 = 1.25rem = 20px
    const availableWidth = width;
    const maxColumns = Math.floor(
      (availableWidth + gapWidth) / (MIN_COLUMN_WIDTH + gapWidth / 6),
    );
    return Math.max(1, Math.min(maxColumns, 8)); // Between 1 and 8 columns
  }, []);

  // Update container width and columns when window resizes
  useEffect(() => {
    const updateWidth = () => {
      if (parentRef.current) {
        const width = parentRef.current.clientWidth;
        setContainerWidth(width);
        setColumns(calculateColumns(width));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [calculateColumns]);

  // Virtualizer configuration for grid view
  const virtualizer = useVirtualizer({
    count: Math.ceil(products.length / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320,
    overscan: 5,
    measureElement: (element) =>
      element?.getBoundingClientRect().height ?? 1000,
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-5 px-8 pt-8 pb-4">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Products</h2>
          <p className="text-gray-500 text-sm">
            Total results ({products.length})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 px-8">
        <Input
          placeholder="Search products..."
          className="w-full"
          leftIcon={<SearchIcon />}
          defaultValue={search}
          onKeyDown={handleSearch}
        />

        <ToggleGroup
          options={OPTIONS_VIEW}
          value={viewMode}
          onChange={setViewMode}
        />
      </div>

      <Activity mode={viewMode === "grid" ? "visible" : "hidden"}>
        <div
          ref={parentRef}
          className="h-[calc(100vh-140px)] overflow-auto px-8 pt-4"
          style={{
            contain: "strict",
          }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const startIndex = virtualItem.index * columns;
              const endIndex = Math.min(startIndex + columns, products.length);
              const rowProducts = products.slice(startIndex, endIndex);

              return (
                <div
                  key={virtualItem.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  }}
                  className="grid gap-5 px-1"
                >
                  {rowProducts.map((product) => (
                    <CardProduct key={product.url} product={product} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Activity>

      <Activity mode={viewMode === "grid" ? "hidden" : "visible"}>
        <TableProduct products={products} />
      </Activity>
    </div>
  );
};

export default Home;
