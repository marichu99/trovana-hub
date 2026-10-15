import { stats } from "../../data/stats";
import RevealSection from "../RevealSection";
import { useCountUp } from "../../lib/useCountUp";

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div className="rounded-2xl border border-warmgrey/20 bg-charcoal/40 p-6 text-center">
      <span ref={ref} className="font-display text-4xl font-semibold text-ember sm:text-5xl">
        {value}
        {stat.suffix}
      </span>
      <p className="mt-2 text-sm text-warmgrey">{stat.label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-stone px-5 py-28 text-charcoal">
      <div className="mx-auto max-w-4xl text-center">
        <RevealSection>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            We're a small studio that <span className="font-accent italic text-espresso">ships.</span>
          </h2>
        </RevealSection>

        <RevealSection delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-charcoal/70">
            Trovana Hub is a lean, youth-led team that handles everything end to end — strategy,
            design, build and growth — so you work with one partner instead of three vendors.
          </p>
        </RevealSection>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <RevealSection key={stat.id} delay={i * 0.08}>
              <StatCard stat={stat} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
