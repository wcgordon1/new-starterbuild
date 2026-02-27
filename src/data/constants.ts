import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "StarterBuild",
  tagline: "We design and build meaningful digital experiences.",
  description:
    "StarterBuild is a design and development studio that creates meaningful digital experiences. We move fast, stay human, and build things people love.",
  description_short: "Design and development studio.",
  url: "https://starterbuild.com",
  author: "Will Gordon",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: "StarterBuild",
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}/favicon.ico`,
        },
        sameAs: [
          "https://x.com/starterbuild",
          "https://www.linkedin.com/company/starterbuild/",
        ],
        founder: {
          "@type": "Person",
          name: "Will Gordon",
          url: "https://www.linkedin.com/in/will-gordon1",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        publisher: {
          "@id": `${SITE.url}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": SITE.url,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        isPartOf: {
          "@id": `${SITE.url}/#website`,
        },
        about: {
          "@id": `${SITE.url}/#organization`,
        },
        inLanguage: "en-US",
      },
    ],
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title} | ${SITE.tagline}`,
  description: SITE.description,
  image: ogImageSrc,
};

export interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
  authorUrl?: string;
  section?: string;
  tags?: string[];
}

export function getArticleStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName = SITE.author,
  authorUrl = "https://www.linkedin.com/in/will-gordon1",
  section,
  tags,
}: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": url,
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified || datePublished,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        author: {
          "@type": "Person",
          name: authorName,
          url: authorUrl,
        },
        publisher: {
          "@id": `${SITE.url}/#organization`,
        },
        isPartOf: {
          "@id": `${SITE.url}/#website`,
        },
        inLanguage: "en-US",
        ...(image && {
          image: {
            "@type": "ImageObject",
            url: image,
          },
        }),
        ...(section && { articleSection: section }),
        ...(tags && { keywords: tags.join(", ") }),
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: "StarterBuild",
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}/favicon.ico`,
        },
        sameAs: [
          "https://x.com/starterbuild",
          "https://www.linkedin.com/company/starterbuild/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        publisher: {
          "@id": `${SITE.url}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: url,
          },
        ],
      },
    ],
  };
}
