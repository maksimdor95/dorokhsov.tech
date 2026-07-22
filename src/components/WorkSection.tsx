import type { Project } from "../data";
import { MetaTags, PillButton, Reveal, SectionHeading } from "./ui";

function ProjectImage({ project }: { project: Project }) {
  if (project.embedSrc) {
    return (
      <div className="project-image project-image--frame mt-6 shrink-0 overflow-hidden">
        <iframe
          src={project.embedSrc}
          title={`Превью проекта ${project.title}`}
          className="block h-full w-full border-0"
          loading="lazy"
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (project.imageSrc) {
    return (
      <div className="project-image project-image--frame project-image--zoom mt-6 shrink-0 overflow-hidden">
        <img
          src={project.imageSrc}
          alt={`Превью проекта ${project.title}`}
          className="block h-full w-full object-cover object-top"
          width={1024}
          height={768}
          decoding="async"
          sizes="(min-width: 768px) calc((100vw - 58px - 29px) / 2), calc(100vw - 58px)"
        />
      </div>
    );
  }

  return (
    <div
      className="project-image project-image--frame project-image--placeholder mt-6 flex shrink-0 items-end p-6"
      style={{ background: project.imageTone }}
      aria-label={`Превью проекта ${project.title}`}
    >
      <span className="type-xs text-linen/90">{project.imageLabel}</span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal delay={index * 80}>
      <article className="flex h-full flex-col">
        <MetaTags tags={project.tags} />

        <h3 className="type-xl mt-5 text-carbon-black">{project.title}</h3>

        <p className="type-lg mt-4 flex-1 text-carbon-black">
          {project.description}
        </p>

        <div className="mt-5">
          {project.href ? (
            <PillButton href={project.href}>View Case Study</PillButton>
          ) : (
            <PillButton href="#contact">Request Preview</PillButton>
          )}
        </div>

        <ProjectImage project={project} />
      </article>
    </Reveal>
  );
}

export function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="page-shell section-gap">
      <Reveal>
        <SectionHeading eyebrow="Избранные проекты">Work</SectionHeading>
      </Reveal>
      <div className="grid items-stretch gap-x-[29px] gap-y-20 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
