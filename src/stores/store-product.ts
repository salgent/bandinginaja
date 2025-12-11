import { create } from "zustand";
import type { Product } from "@/types";

interface ProductState {
  products: Product[];
  search: string;
  compareProducts: Product[];

  actions: {
    setSearch: (search: string) => void;
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
  const groups: {
    baseName: string;
    products: Product[];
    lowestPrice: number;
    highestPrice: number;
    priceDifference: number;
    platformCount: number;
  }[] = [];
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

const storeProduct = create<ProductState>()((set) => ({
  products: [],
  search: "",
  compareProducts: [],

  actions: {
    setSearch: (search: string) =>
      set({ search, products: [], compareProducts: [] }),
    setProducts: (products: Product[]) =>
      set((state) => ({ products: state.products.concat(products) })),
    setCompareProducts: (similar = 0.5) => {
      set((state) => {
        const groupedProducts = groupSimilarProducts(
          state.products.filter((product) => product.url),
          similar,
        );
        const allProducts = groupedProducts.flatMap((group) => group.products);
        const data = groupSimilarProducts(allProducts, 0.5);

        return {
          compareProducts: data.map((group, groupIndex) => ({
            groupIndex,
            baseName: group.baseName,
            products: group.products,
            lowestPrice: group.lowestPrice,
            highestPrice: group.highestPrice,
            priceDifference: group.priceDifference,
            platformCount: group.platformCount,
            productCards: group.products.map((product, productIndex) => ({
              index: productIndex,
              // name: `Product ${productIndex + 1}`,
              name: product.name,
              platform: product.platform,
              imageUrl: product.imageUrl,
              shopName: product.shopName,
              url: product.url,
              price: product.price,
              rating: product.rating,
              soldCount: product.soldCount,
              shopLocation: product.shopLocation,
              originalPrice: product.originalPrice,
            })),
          })),
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
