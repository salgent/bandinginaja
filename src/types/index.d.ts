export type Product = {
  url?: string;
  imageUrl?: string;
  campaignImageUrl?: string;
  name: string;
  price: string;
  originalPrice: string;
  rating: string;
  ratingImageUrl?: string;
  soldCount: string;
  shopBadgeUrl?: string;
  shopName: string;
  shopLocation: string;
  platform: string;
};

export type CompareProduct = {
  baseName: string;
  products: Product[];
  lowestPrice: number;
  highestPrice: number;
  priceDifference: number;
  platformCount: number;
};
