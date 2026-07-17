/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./src/content/blog/posts/**/*.md"],
  },
  // This deploy hosts the 500 demo sites — keep the entire thing OUT of search.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
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
