import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "Will Gordon - Person",
  tagline: "Doing things and chicken.",
  description: "Building stuffs and eating and looking at other people do stuff, sometimes.",
  description_short: "human on the internet. ",
  url: "https://will.xn--q9jyb4c/",
  author: "Will Gordon",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
    author: {
      "@type": "Person",
      name: "Will Gordon",
      description: "Co-Founder at Tustin Recruiting",
      url: SITE.url,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title} - ${SITE.tagline}`,
  description: SITE.description,
  image: ogImageSrc,
};
