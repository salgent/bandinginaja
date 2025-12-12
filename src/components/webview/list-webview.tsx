import { load } from "cheerio";
import {
  EXECUTE_JAVASCRIPT_BLIBLI,
  EXECUTE_JAVASCRIPT_LAZADA,
  EXECUTE_JAVASCRIPT_SHOPEE,
  EXECUTE_JAVASCRIPT_TOKOPEDIA,
} from "@/constants/execute-javascript";
import { useProductActions, useSearch } from "@/stores/store-product";
import type { Product } from "@/types";
import Webview from "./webview";

const ListWebview = () => {
  const search = useSearch();
  const { setProducts } = useProductActions();

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

  const handleGetHtmlBlibli = (html: string) => {
    const $ = load(html);

    const data = $.extract({
      products: [
        {
          selector: ".product-list__card",
          value: {
            url: {
              selector: "a.elf-product-card",
              value: (el) => `https://www.blibli.com${$(el).attr("href")}`,
            },
            imageUrl: {
              selector: "img.image.b-active",
              value: "src",
            },
            name: {
              selector: "span.els-product__title span",
            },
            price: {
              selector: "div.els-product__fixed-price",
              value: (el) =>
                $(el)
                  .text()
                  .replace(/Rp|\.|,/g, "")
                  .trim(),
            },
            rating: {
              selector: "div.els-product__rating span",
            },
            soldCount: {
              selector: "div.els-product__sold",
            },
            shopName: {
              selector: "span.els-product__seller-name",
            },
            platform: {
              selector: "div",
              value: () => {
                return "blibli";
              },
            },
          },
        },
      ],
    });

    setProducts(data.products as Product[]);
  };

  return (
    <>
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
      <Webview
        src={`https://blibli.com/cari/${encodeURIComponent(search)}`}
        onGetHtml={handleGetHtmlBlibli}
        executeJavaScript={EXECUTE_JAVASCRIPT_BLIBLI}
      />
    </>
  );
};

export default ListWebview;
