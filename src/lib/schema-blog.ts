import { DomainConfig } from "@/content/config";
import { BlogPost } from "@/content/blog";

export function generateBlogIndexSchema(posts: BlogPost[], config: DomainConfig) {
  const domain = `https://${config.domain}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${domain}/blog`,
    name: `Blog | ${config.brandName}`,
    description: `Web design insights, small business tips, and website guides for ${config.region} businesses.`,
    url: `${domain}/blog`,
    isPartOf: { "@id": `${domain}/#website` },
    hasPart: posts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${domain}/blog/${post.slug}`,
      datePublished: post.date,
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: domain,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${domain}/blog`,
        },
      ],
    },
  };
}

export function generateBlogPostSchema(post: BlogPost, config: DomainConfig) {
  const domain = `https://${config.domain}`;
  const postUrl = `${domain}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // BlogPosting
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}/#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.modifiedDate,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        author: {
          "@type": "Person",
          name: post.author.name,
          description: post.author.bio,
          jobTitle: post.author.role,
          ...(post.author.image && { image: `${domain}${post.author.image}` }),
          ...(post.author.socials.linkedin && {
            sameAs: [
              post.author.socials.linkedin,
              ...(post.author.socials.twitter ? [post.author.socials.twitter] : []),
            ],
          }),
        },
        publisher: {
          "@type": "Organization",
          "@id": `${domain}/#business`,
          name: config.brandName,
          ...(config.telephone && { telephone: config.telephone }),
          ...(config.email && { email: config.email }),
        },
        ...(post.featuredImage && {
          image: {
            "@type": "ImageObject",
            url: `${domain}${post.featuredImage}`,
            width: 1200,
            height: 630,
          },
        }),
        wordCount: post.wordCount,
        keywords: post.tags.join(", "),
        articleSection: post.category,
        inLanguage: "en",
        isPartOf: { "@id": `${domain}/#website` },
      },

      // Speakable
      {
        "@type": "WebPage",
        "@id": `${postUrl}/#webpage`,
        url: postUrl,
        name: post.title,
        description: post.excerpt,
        isPartOf: { "@id": `${domain}/#website` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".article-title", ".article-intro"],
        },
      },

      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: domain,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${domain}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };
}
