// import gplay from "google-play-scraper";

// export type Review = {
//   id: string;
//   userName: string;
//   score: number;
//   text: string;
// };

// const cache = new Map<string, { expires: number; data: Review[] }>();
// const TTL = 1000 * 60 * 10; // 10 minutes

// export async function fetchAppInfo(pkg: string) {
//   // simple caching to avoid repeated calls while developing
//   const key = `appinfo:${pkg}`;
//   const now = Date.now();
//   const cached = cache.get(key);
//   if (cached && cached.expires > now) return (cached.data as any)[0];

//   const info = await gplay.app({
//     appId: pkg,
//     country: "in",
//     lang: "en",
//   });

//   const result = {
//     rating: info.score,
//     ratingsCount: info.ratings,
//     formattedRatings: Intl.NumberFormat("en-US", {
//       notation: "compact",
//       maximumFractionDigits: 1,
//     }).format(info.ratings || 0),
//   };

//   // store as single-item array so we can reuse same cache map
//   cache.set(key, { expires: now + TTL, data: [result as any] });
//   return result;
// }

// export default async function fetchPlayStoreReviews(pkg: string, num = 20): Promise<Review[]> {
//   const key = `${pkg}:${num}`;
//   const now = Date.now();
//   const cached = cache.get(key);
//   if (cached && cached.expires > now) return cached.data as Review[];

//   const res = await gplay.reviews({
//     appId: pkg,
//     sort: gplay.sort,
//     num: Math.min(num, 100),
//     country: "in",
//     lang: "en",
//   });

//   const data: Review[] = res.data.map(r => ({
//     id: r.id,
//     userName: r.userName,
//     score: r.score,
//     text: r.text,
//   }));

//   cache.set(key, { expires: now + TTL, data });
//   return data;
// }
