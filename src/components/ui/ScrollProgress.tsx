import { useEffect, useRef } from 'react';

const sectionLabels = ['Intro', 'Projects', 'Experience', 'Research', 'Contact'];

type ScrollProgressProps = {
  activeSection: string;
};

const labelBySection: Record<string, string> = {
  intro: 'Intro',
  projects: 'Projects',
  experience: 'Experience',
  research: 'Research',
  contact: 'Contact',
};

export function ScrollProgress({ activeSection }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const sync = () => {
      const progress = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scroll-progress') || '0');
      progressRef.current?.style.setProperty('--local-scroll', String(Number.isFinite(progress) ? progress : 0));
      raf = requestAnimationFrame(sync);
    };

    sync();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <aside className="scroll-progress" ref={progressRef} aria-label="Page progress">
      <div className="scroll-progress__track">
        <span />
      </div>
      <div className="scroll-progress__labels">
        {sectionLabels.map((label) => (
          <span key={label} className={labelBySection[activeSection] === label ? 'is-active' : ''}>
            {label}
          </span>
        ))}
      </div>
    </aside>
  );
}
