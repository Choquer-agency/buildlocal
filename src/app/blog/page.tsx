import type { Metadata } from "next";
import Link from "next/link";
import { getStaticDomainConfig } from "@/lib/getStaticDomainConfig";
import { getBlogPostsByRegion } from "@/content/blog";
import { generateBlogIndexSchema } from "@/lib/schema-blog";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const config = getStaticDomainConfig();
  const title = `Blog | ${config.brandName}`;
  const description = `SEO insights, strategies, and growth tips for ${config.region} businesses. Expert advice from ${config.brandName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/blog`,
      siteName: config.brandName,
      images: [
        {
          url: `https://${config.domain}/images/og-default.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://${config.domain}/blog`,
    },
  };
}

export default async function BlogIndex() {
  const config = getStaticDomainConfig();
  const posts = await getBlogPostsByRegion(config.region);
  const blogIndexSchema = generateBlogIndexSchema(posts, config);

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
    />
    <Nav brandName={config.brandName} />
    <main className="pt-32 pb-20" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container max-w-4xl">
        <p className="eyebrow text-brand mb-4">Blog</p>
        <h1 className="font-sans font-medium text-fluid-h2 leading-[1.1] text-dark mb-4">
          Insights from {config.locality}
        </h1>
        <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed mb-16 max-w-[55ch]">
          SEO strategies, growth insights, and search optimization tips for {config.region} businesses.
        </p>

        {posts.length === 0 ? (
          <p className="font-sans text-fluid-main text-dark opacity-40">
            New articles coming soon. Check back shortly.
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group p-8 rounded-sm bg-white transition-all hover:shadow-lg"
                style={{ transitionDuration: "0.3s" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-brand">
                    {post.category}
                  </span>
                  <span className="font-mono text-xs text-dark opacity-30">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-mono text-xs text-dark opacity-30">
                    {post.readingTime} min read
                  </span>
                </div>
                <h2 className="font-sans font-medium text-fluid-h4 leading-[1.2] text-dark mb-3 group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
                <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/"
            className="font-sans text-fluid-main text-brand hover:opacity-70 transition-opacity"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
    <Footer brandName={config.brandName} />
    </>
  );
}
