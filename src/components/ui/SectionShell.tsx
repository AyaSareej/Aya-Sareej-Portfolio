import { ReactNode } from 'react';

type SectionShellProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, eyebrow, title, children, className = '' }: SectionShellProps) {
  return (
    <section id={id} data-section={id} className={`section-shell ${className}`.trim()}>
      {(eyebrow || title) && (
        <header className="section-heading reveal">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h2>{title}</h2>}
        </header>
      )}
      {children}
    </section>
  );
}
