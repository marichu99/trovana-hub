export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  { id: "discover", title: "Discover", description: "We learn your business, goals and audience." },
  { id: "design", title: "Design", description: "We map the experience and visual direction." },
  { id: "build", title: "Build", description: "We develop fast, clean, and built to convert." },
  { id: "launch", title: "Launch", description: "We ship, test, and polish every detail." },
  { id: "grow", title: "Grow", description: "We measure, iterate, and scale what works." },
];
