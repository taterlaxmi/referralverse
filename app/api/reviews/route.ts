// import { NextResponse } from "next/server";
// import gplay from "google-play-scraper";

// export async function GET(req: Request) {
//     const url = new URL(req.url);
//     const pkg = url.searchParams.get("package");

//     if (!pkg) {
//         return NextResponse.json(
//             { error: "package query is required" },
//             { status: 400 }
//         );
//     }

//     try {
//         const info = await gplay.app({ appId: pkg, country: "in", lang: "en" });

//         return NextResponse.json({
//             rating: info.score,              // 4.7
//             ratingsCount: info.ratings,      // 90213
//             formattedRatings: Intl.NumberFormat("en-US", {
//                 notation: "compact",
//                 maximumFractionDigits: 1,
//             }).format(info.ratings),         // "90.2K"
//         });
//     } catch (err: any) {
//         console.error("APP INFO ERROR:", err);
//         return NextResponse.json(
//             { error: err.message || "failed to fetch app info" },
//             { status: 500 }
//         );
//     }
// }
