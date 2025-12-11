import { load } from "cheerio";
import { ListIcon, SearchIcon, TableIcon } from "lucide-react";
import type { BaseUIEvent } from "node_modules/@base-ui-components/react/utils/types";
import type React from "react";
import { type KeyboardEvent, useState } from "react";
import CardProduct from "@/components/card/card-product";
import TableProduct from "@/components/table/table-product";
import Input from "@/components/ui/input";
import ToggleGroup from "@/components/ui/toggle-group";
import Webview from "@/components/webview/webview";
import {
  EXECUTE_JAVASCRIPT_LAZADA,
  EXECUTE_JAVASCRIPT_SHOPEE,
  EXECUTE_JAVASCRIPT_TOKOPEDIA,
} from "@/constants/execute-javascript";
import {
  useProductActions,
  useProducts,
  useSearch,
} from "@/stores/store-product";
import type { Product } from "@/types";

const OPTIONS_VIEW = [
  {
    label: <ListIcon className="h-4 w-4" />,
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
  const { setProducts, setSearch } = useProductActions();

  const handleGetHtmlTokopedia = (html: string) => {
    const $ = load(html);

    const data = $.extract({
      products: [
        {
          selector:
            "div[data-testid='divSRPContentProducts'] div.css-5wh65g [class*='Ui5-B4CDAk4Cv-cjLm4o0g']",
          value: (el) => {
            return {
              url: $(el).closest("a").attr("href"),
              imageUrl: $(el).find("img[alt='product-image']").attr("src"),
              campaignImageUrl: $(el).find("img[alt='Campaign']").attr("src"),
              name: $(el)
                .find("span[class*='tnoqZhn89+NHUA43BpiJg==']")
                .text()
                .trim(),
              price: $(el)
                .find("div[class*='urMOIDHH7I0Iy1Dv2oFaNw==']")
                .text()
                .replace(/Rp|\./g, "")
                .trim(),
              originalPrice: $(el)
                .find("span[class*='hC1B8wTAoPszbEZj80w6Qw==']")
                .text()
                .replace(/Rp|\./g, "")
                .trim(),
              rating: $(el)
                .find("span[class*='_2NfJxPu4JC-55aCJ8bEsyw==']")
                .text()
                .trim(),
              ratingImageUrl: $(el).find("img[alt='rating']").attr("src"),
              soldCount: $(el)
                .find("span[class*='u6SfjDD2WiBlNW7zHmzRhQ==']")
                .text()
                .trim(),
              shopBadgeUrl: $(el).find("img[alt='shop badge']").attr("src"),
              shopName: $(el)
                .find("span[class*='si3CNdiG8AR0EaXvf6bFbQ==']")
                .first()
                .text()
                .trim(),
              shopLocation: $(el)
                .find("span[class*='gxi+fsEljOjqhjSKqjE+sw==']")
                .last()
                .text()
                .trim(),
              platform: "tokopedia",
            };
          },
        },
      ],
    });

    setProducts(data.products);
  };

  const handleGetHtmlLazada = (html: string) => {
    const $ = load(html);

    const data = $.extract({
      products: [
        {
          selector: "div._17mcb div.Bm3ON[data-qa-locator='product-item']",
          value: {
            url: {
              selector: "a",
              value: (el) => `https://${$(el).attr("href")?.replace("//", "")}`,
            },
            imageUrl: {
              selector: "img",
              value: (el) => $(el).attr("src")?.replace("80x80", "800x800"),
            },
            name: {
              selector: "div.RfADt a",
              value: "title",
            },
            price: {
              selector: "span.ooOxS",
              value: (el) =>
                $(el)
                  .text()
                  .replace(/Rp|\.|,/g, "")
                  .trim(),
            },
            rating: {
              selector: ".mdmmT",
              value: (el) => {
                const fullStars = $(el).find(".Dy1nx").length;
                const halfStars = $(el).find(".JhD\\+v").length;
                const total = fullStars + halfStars * 0.5;
                return total.toFixed(1);
              },
            },
            soldCount: {
              selector: "._1cEkb",
              value: (el) => $(el).text().trim(),
            },
            shopLocation: {
              selector: ".oa6ri",
              value: "title",
            },
            platform: {
              selector: "div",
              value: () => {
                return "lazada";
              },
            },
          },
        },
      ],
    });

    setProducts(data.products as Product[]);
  };

  const handleGetHtmlShopee = (html: string) => {
    const $ = load(html);

    const data = $.extract({
      products: [
        {
          selector: "li.col-xs-2-4.shopee-search-item-result__item",
          value: {
            url: {
              selector: "a.contents",
              value: (el) =>
                `https://shopee.co.id/${$(el).attr("href")?.replace("//", "")}`,
            },
            imageUrl: {
              selector:
                "img.inset-y-0.w-full.h-full.pointer-events-none.object-contain.absolute",
              value: "src",
            },
            name: {
              selector: "div.line-clamp-2.break-words",
            },
            price: {
              selector: "div.truncate.flex.items-baseline",
              value: (el) =>
                $(el)
                  .text()
                  .replace(/Rp|\.|,/g, "")
                  .trim(),
            },
            rating: {
              selector: "div.text-shopee-black87.text-xs\\/sp14.flex-none",
            },
            soldCount: {
              selector: "div.truncate.text-shopee-black87.text-xs.min-h-4",
            },
            shopLocation: {
              selector: ".ml-[3px].align-middle",
            },
            platform: {
              selector: "div",
              value: () => {
                return "shopee";
              },
            },
          },
        },
      ],
    });

    setProducts(data.products as Product[]);
  };

  const handleSearch = (
    event: BaseUIEvent<KeyboardEvent<HTMLInputElement>>,
  ) => {
    if (event.key === "Enter") {
      setSearch(event.currentTarget.value);
    }
  };

  return (
    <div className="p-8">
      <Webview
        src={`https://www.tokopedia.com/search?q=${encodeURIComponent(search)}`}
        onGetHtml={handleGetHtmlTokopedia}
        executeJavaScript={EXECUTE_JAVASCRIPT_TOKOPEDIA}
      />
      <Webview
        src={`https://www.lazada.co.id/catalog/?q=${encodeURIComponent(search)}`}
        onGetHtml={handleGetHtmlLazada}
        executeJavaScript={EXECUTE_JAVASCRIPT_LAZADA}
      />
      <Webview
        src={`https://shopee.co.id/search?keyword=${encodeURIComponent(search)}`}
        onGetHtml={handleGetHtmlShopee}
        executeJavaScript={EXECUTE_JAVASCRIPT_SHOPEE}
      />

      <div className="mb-4 flex items-center justify-between gap-5">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Products</h2>
          <p className="text-gray-500 text-sm">
            Total results ({products.length})
          </p>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-3">
        <Input
          placeholder="Search products..."
          className="w-1/2"
          leftIcon={<SearchIcon />}
          onKeyDown={handleSearch}
        />

        <ToggleGroup
          options={OPTIONS_VIEW}
          value={viewMode}
          onChange={setViewMode}
        />
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-6 gap-5">
          {products.map((product) => (
            <CardProduct key={product.url} product={product} />
          ))}
        </div>
      ) : (
        <TableProduct products={products} />
      )}
    </div>
  );
};

export default Home;
