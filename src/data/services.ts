export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  bullets: string[];
  badge?: string;
};

export const services: Service[] = [
  {
    id: "web",
    index: "01",
    title: "Website Development",
    summary: "Custom marketing sites, web apps and dashboards built to perform.",
    bullets: [
      "Custom marketing sites & web apps",
      "Dashboards and internal tools",
      "E-commerce and booking systems",
      "Performance and SEO baked in",
    ],
  },
  {
    id: "ads",
    index: "02",
    title: "Digital Advertising",
    summary: "Meta and Google campaigns engineered around conversion, not vanity metrics.",
    bullets: [
      "Meta and Google Ads management",
      "Conversion-focused landing pages",
      "Audience targeting and retargeting",
      "Reporting with ROI tracking",
    ],
  },
  {
    id: "video",
    index: "03",
    title: "AI Property Videos",
    summary: "Cinematic short videos made from a property's existing photos — ready in 48 hours.",
    bullets: [
      "Made from your existing photos",
      "Ready for Reels, TikTok & booking sites",
      "Delivered in 48 hours",
      "Built to drive bookings",
    ],
    badge: "NEW",
  },
];
