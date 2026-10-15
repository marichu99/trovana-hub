export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  placeholder: boolean;
  image?: string;
  previewVideo?: string;
};

export const projects: Project[] = [
  {
    id: "kwamz-ai",
    title: "Kwamz AI",
    description: "A full AI-driven platform — product strategy, engineering and launch.",
    tags: ["Website Development", "Product Engineering"],
    href: "https://kwamz-ai.org",
    placeholder: false,
  },
  {
    id: "aframe-cabin",
    title: "A-Frame Cabin",
    description: "AI property video generated from the host's own listing photos — ready for Reels and the booking page.",
    tags: ["AI Property Videos"],
    placeholder: false,
    image: "/media/living-room.webp",
    previewVideo: "/media/living-room-reel.mp4",
  },
  {
    id: "next-1",
    title: "Next client project",
    description: "This slot is reserved for the next studio case study — ask us about it.",
    tags: ["Website Development"],
    placeholder: true,
  },
  {
    id: "next-2",
    title: "Next client project",
    description: "This slot is reserved for the next studio case study — ask us about it.",
    tags: ["Digital Advertising"],
    placeholder: true,
  },
];
