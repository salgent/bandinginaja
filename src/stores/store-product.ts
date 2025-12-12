import { create } from "zustand";
import type { CompareProduct, Product } from "@/types";

interface ProductState {
  products: Product[];
  search: string;
  similarity: number;
  compareProducts: CompareProduct[];

  actions: {
    setSearch: (search: string) => void;
    setSimilarity: (similarity: number) => void;
    setProducts: (products: Product[]) => void;
    setCompareProducts: (similar?: number) => void;
  };
}

const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1;

  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  const longerLength = longer.length;
  if (longerLength === 0) return 1;

  const costs = [];
  for (let i = 0; i <= shorter.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= longer.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (shorter.charAt(i - 1) !== longer.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[longer.length] = lastValue;
  }

  return (longerLength - costs[longer.length]) / longerLength;
};

const parsePrice = (priceString: string): number => {
  const cleaned = priceString.replace(/[^\d]/g, "");
  return parseInt(cleaned, 10) || 0;
};

const groupSimilarProducts = (products: Product[], minSimilarity = 0.5) => {
  const groups: CompareProduct[] = [];
  const used = new Set<number>();

  products.forEach((product, index) => {
    if (used.has(index)) return;

    const group = [product];
    used.add(index);

    products.forEach((other, otherIndex) => {
      if (otherIndex <= index || used.has(otherIndex)) return;

      const cleanName1 = product.name
        .toLowerCase()
        .replace(
          /\b(official|original|murah|termurah|promo|diskon|sale|gratis|free|cod|bayar|di|tempat)\b/g,
          "",
        )
        .replace(/[^\w\s]/gi, "")
        .trim();

      const cleanName2 = other.name
        .toLowerCase()
        .replace(
          /\b(official|original|murah|termurah|promo|diskon|sale|gratis|free|cod|bayar|di|tempat)\b/g,
          "",
        )
        .replace(/[^\w\s]/gi, "")
        .trim();

      const similarity = calculateSimilarity(cleanName1, cleanName2);
      if (similarity >= minSimilarity) {
        group.push(other);
        used.add(otherIndex);
      }
    });

    const prices = group.map((p) => parsePrice(p.price)).filter((p) => p > 0);
    const lowestPrice = Math.min(...prices);
    const highestPrice = Math.max(...prices);

    groups.push({
      baseName: product.name,
      products: group.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)),
      lowestPrice,
      highestPrice,
      priceDifference: highestPrice - lowestPrice,
      platformCount: group.length,
    });
  });

  return groups.sort((a, b) => b.platformCount - a.platformCount);
};

const storeProduct = create<ProductState>()((set, get) => ({
  products: [],
  compareProducts: [],
  search: "",
  similarity: 0.5,

  actions: {
    setSearch: (search: string) =>
      set({ search, products: [], compareProducts: [] }),
    setSimilarity: (similarity: number) => {
      set({ similarity });
      get().actions.setCompareProducts();
    },
    setProducts: (products: Product[]) =>
      set((state) => ({ products: state.products.concat(products) })),
    setCompareProducts: () => {
      set((state) => {
        const groupedProducts = groupSimilarProducts(
          state.products.filter((product) => product.url),
          state.similarity,
        );

        return {
          compareProducts: groupedProducts,
        };
      });
    },
  },
}));

export const useSearch = () => storeProduct((state) => state.search);
export const useProducts = () => storeProduct((state) => state.products);
export const useCompareProducts = () =>
  storeProduct((state) => state.compareProducts);

export const useProductActions = () => storeProduct((state) => state.actions);
