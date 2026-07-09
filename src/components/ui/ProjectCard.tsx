import { PointerEvent, useRef } from 'react';
import { Project } from '../../data/portfolio';

type ProjectCardProps = {
  project: Project;
  index: number;
  onFocusProject: (index: number) => void;
};

export function ProjectCard({ project, index, onFocusProject }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty('--card-rx', `${-y * 9}deg`);
    element.style.setProperty('--card-ry', `${x * 11}deg`);
    element.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    element.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  };

  const resetTilt = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty('--card-rx', '0deg');
    element.style.setProperty('--card-ry', '0deg');
    element.style.setProperty('--glow-x', '50%');
    element.style.setProperty('--glow-y', '50%');
  };

  return (
    <article
      ref={ref}
      className={`project-card project-card--${project.accent} reveal`}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => onFocusProject(index)}
      onFocus={() => onFocusProject(index)}
      onPointerLeave={resetTilt}
      tabIndex={0}
    >
      <div className="card-glow" />
      <div className="project-card__meta">
        <span>{project.eyebrow}</span>
        <span>{project.timeframe}</span>
      </div>
      <h3>{project.title}</h3>
      {project.location && <p className="project-card__location">{project.location}</p>}
      <p className="project-card__description">{project.description}</p>
      <ul className="project-card__impact" aria-label={`${project.title} impact`}>
        {project.impact.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="chip-row" aria-label={`${project.title} technologies`}>
        {project.technologies.map((tech) => (
          <span className="chip" key={tech}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
