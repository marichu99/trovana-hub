export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { id: "disciplines", value: 3, suffix: "", label: "Core disciplines" },
  { id: "team", value: 1, suffix: "", label: "Team, end-to-end" },
  { id: "turnaround", value: 48, suffix: "h", label: "Video turnaround" },
  { id: "convert", value: 100, suffix: "%", label: "Built to convert" },
];
