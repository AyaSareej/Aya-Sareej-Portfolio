import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ExternalLink, Mail, MapPin, Phone, Sparkles as SparklesIcon } from 'lucide-react';
import { sceneRuntime } from './components/scene/sceneRuntime';
import { MagneticButton } from './components/ui/MagneticButton';
import { ProjectCard } from './components/ui/ProjectCard';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { SectionShell } from './components/ui/SectionShell';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import {
  education,
  experiences,
  featuredProjects,
  heroStats,
  languages,
  leadership,
  profile,
  skillGroups,
} from './data/portfolio';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PortfolioScene = lazy(() =>
  import('./components/scene/PortfolioScene').then((module) => ({ default: module.PortfolioScene })),
);

const navItems = [
  { href: '#intro', label: 'Intro' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#research', label: 'Research' },
  { href: '#contact', label: 'Contact' },
];

function App() {
  const shellRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      sceneRuntime.pointerX = x * 2 - 1;
      sceneRuntime.pointerY = y * 2 - 1;
      document.documentElement.style.setProperty('--pointer-x', `${x * 100}%`);
      document.documentElement.style.setProperty('--pointer-y', `${y * 100}%`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useGSAP(
    () => {
      const root = shellRef.current;
      if (!root) return;

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          sceneRuntime.scroll = self.progress;
          document.documentElement.style.setProperty('--scroll-progress', self.progress.toFixed(4));
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal', root).forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: reducedMotion ? 0 : 34,
            filter: reducedMotion ? 'none' : 'blur(10px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            delay: Math.min(index * 0.018, 0.18),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-section]', root).forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActiveSection(section.dataset.section ?? 'intro');
          },
        });
      });

      gsap.to('.hero__orbital', {
        rotate: reducedMotion ? 0 : 360,
        duration: 28,
        repeat: reducedMotion ? 0 : -1,
        ease: 'none',
      });
    },
    { scope: shellRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  const focusProject = (index: number) => {
    sceneRuntime.activeProject = index;
  };

  return (
    <div className="app" ref={shellRef}>
      <Suspense fallback={<div className="scene-fallback" aria-hidden="true" />}>
        <PortfolioScene reducedMotion={reducedMotion} />
      </Suspense>
      <div className="grain-layer" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />
      <ScrollProgress activeSection={activeSection} />

      <header className="site-header">
        <a href="#intro" className="brand" aria-label="Aya Sareej home">
          <span className="brand-mark">A</span>
          <span>Aya Sareej</span>
        </a>
        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? 'is-active' : ''}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="site-shell">
        <section id="intro" data-section="intro" className="hero section-shell">
          <div className="hero__content">
            <p className="eyebrow reveal">
              <SparklesIcon size={16} aria-hidden="true" /> AI research into usable products
            </p>
            <h1 className="reveal">
              Designing intelligent interfaces where <span>computer vision</span>, <span>speech AI</span>, and <span>frontend craft</span> meet.
            </h1>
            <p className="hero__summary reveal">{profile.summary}</p>
            <div className="hero__actions reveal">
              <MagneticButton href="#projects">Explore work</MagneticButton>
              <MagneticButton href={profile.cvPath} variant="ghost" target="_blank" rel="noreferrer">
                Download CV <ArrowUpRight size={17} aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>

          <div className="hero__panel reveal" aria-label="Profile highlights">
            <div className="hero__orbital" aria-hidden="true" />
            <p className="panel-kicker">Signal profile</p>
            <h2>{profile.title}</h2>
            <p>{profile.positioning}</p>
            <dl className="stat-grid">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <SectionShell id="projects" eyebrow="Featured systems" title="Applied AI with product-grade interaction.">
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.title} onFocusProject={focusProject} />
            ))}
          </div>
        </SectionShell>

        <SectionShell id="experience" eyebrow="Experience map" title="Research depth, frontend structure, and visual storytelling.">
          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-card reveal" key={`${item.role}-${item.company}`}>
                <div className="timeline-card__header">
                  <div>
                    <p className="timeline-card__time">{item.timeframe}</p>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <span>{item.location}</span>
                </div>
                {item.technologies && (
                  <div className="chip-row compact">
                    {item.technologies.map((tech) => (
                      <span className="chip" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="research" eyebrow="Capability matrix" title="A skill stack shaped for AI products that people can actually use.">
          <div className="capability-layout">
            <div className="skill-groups reveal">
              {skillGroups.map((group) => (
                <article className="skill-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <div className="chip-row">
                    {group.skills.map((skill) => (
                      <span className="chip" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="knowledge-stack reveal">
              <article>
                <p className="panel-kicker">Education</p>
                <h3>{education.degree}</h3>
                <p>{education.school}</p>
                <span>{education.graduation}</span>
              </article>

              <article>
                <p className="panel-kicker">Leadership</p>
                {leadership.map((item) => (
                  <div className="leadership-item" key={item.role}>
                    <h3>{item.role}</h3>
                    <p>{item.organization}</p>
                    <span>{item.timeframe}</span>
                    <small>{item.detail}</small>
                  </div>
                ))}
              </article>

              <article>
                <p className="panel-kicker">Languages</p>
                <div className="language-grid">
                  {languages.map((item) => (
                    <div key={item.language}>
                      <strong>{item.language}</strong>
                      <span>{item.level}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="contact" eyebrow="Contact" title="Ready to turn intelligent research into a polished user experience?" className="contact-section">
          <div className="contact-card reveal">
            <div>
              <p className="panel-kicker">Available for AI + frontend collaboration</p>
              <h3>{profile.name}</h3>
              <p>
                Based in {profile.location}, focused on AI systems, React frontends, interfaces, dashboards, and research prototypes.
              </p>
            </div>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" /> {profile.email}
              </a>
              <a href={`tel:${profile.phone.replaceAll(' ', '')}`}>
                <Phone size={18} aria-hidden="true" /> {profile.phone}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <ExternalLink size={18} aria-hidden="true" /> LinkedIn
              </a>
              <span>
                <MapPin size={18} aria-hidden="true" /> {profile.location}
              </span>
            </div>
          </div>
        </SectionShell>
      </main>
    </div>
  );
}

export default App;
