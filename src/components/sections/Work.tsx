import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/projects";
import { useReducedMotion } from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPreview = () => {
    videoRef.current?.play().catch(() => {});
  };
  const stopPreview = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const content = (
    <div
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      className="group relative h-[60vh] w-[85vw] shrink-0 overflow-hidden rounded-3xl border border-warmgrey/20 bg-espresso/40 sm:w-[60vw] lg:w-[42vw]"
    >
      {project.image ? (
        <>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {project.previewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-espresso via-caramel/30 to-charcoal transition-transform duration-700 ease-out group-hover:scale-105">
          {project.placeholder ? (
            <span className="text-sm uppercase tracking-widest text-warmgrey">
              Next client project
            </span>
          ) : (
            <span className="font-display text-4xl font-semibold text-stone">Kwamz AI</span>
          )}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent p-8">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-warmgrey/30 px-3 py-1 text-xs text-stone/80"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-stone">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm text-warmgrey">{project.description}</p>
      </div>
    </div>
  );

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" data-cursor="View">
        {content}
      </a>
    );
  }
  return (
    <div data-cursor={project.placeholder ? "Soon" : project.previewVideo ? "Preview" : "View"}>
      {content}
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-charcoal py-28">
      <div className="mx-auto mb-14 max-w-6xl px-5">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-stone sm:text-5xl">
          Built by <span className="font-accent italic text-caramel">Trovana Hub.</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className={
          reducedMotion
            ? "flex gap-6 overflow-x-auto px-5 pb-4"
            : "flex w-max gap-6 px-5"
        }
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
