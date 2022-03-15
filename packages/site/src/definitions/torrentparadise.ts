import type { ISiteMetadata } from "../types";

export const siteMetadata: ISiteMetadata = {
  name: "TorrentParadise",
  type: "public",
  description: "Torrent Paradise is a Public magnet indexer",
  url: "https://torrentparadise.cl/",
  legacyUrl: [
    "https://torrentparadise.org/",
    "https://torrentparadise.to/",
    "https://torrentparadise.cc/",
    "https://torrentparadise.la/",
  ],
  search: {
    requestConfig: { url: "search.php" },
    keywordsParam: "f",
    selectors: {
      rows: { selector: "table.table-bordered > tbody > tr.table-default" },
      id: {
        selector: "td:nth-child(2) a",
        attr: "href",
        filters: [(q: string) => q.match(/torrent\/(\d+)/)![1]],
      },
      title: { selector: "td:nth-child(2) a" },
      url: { selector: "td:nth-child(2) a", attr: "href" },
      time: { selector: "td:nth-child(4)", filters: [{ name: "parseTTL" }] },
      size: { selector: "td:nth-child(3)" },
      seeders: { selector: "td:nth-child(5)" },
      leechers: { selector: "td:nth-child(6)" },
      category: { selector: "td:nth-child(1) a" },
    },
  },
  detail: {
    selectors: {
      link: { selector: 'a[href^="magnet:?xt="]', attr: "href" },
    },
  },
};
