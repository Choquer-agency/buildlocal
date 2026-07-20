/** @type {import('next').NextConfig} */

// Whole-site noindex is opt-in via env, set ONLY on the demos deploy
// (buildlocal-az-demos → demo.buildlocal.agency), which hosts the 500 demo
// sites. The LIVE buildlocal.agency deploy leaves this unset so its marketing
// SEO pages stay indexed. Campaign routes (/p/*, /admin/*) carry their own
// per-page `robots: {index:false}`, so they stay out of search on any domain.
const NOINDEX_ALL = process.env.NOINDEX_ALL === "1";

const nextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./src/content/blog/posts/**/*.md"],
  },
  async headers() {
    return [
      ...(NOINDEX_ALL
        ? [{
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          }]
        : []),
      // CORS for flyer assets so Lob's renderer (cross-origin) can load the
      // fonts + images. Fonts especially: Chrome blocks cross-origin @font-face
      // without Access-Control-Allow-Origin, which is why the Lob proof fell
      // back to Arial. Applies to /fonts/* and /m/* (logo, QR, screenshots).
      {
        source: "/fonts/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
      {
        source: "/m/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default nextConfig;
