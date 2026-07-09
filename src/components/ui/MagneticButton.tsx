import { AnchorHTMLAttributes, PointerEvent, useRef } from 'react';

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost';
};

export function MagneticButton({ children, variant = 'primary', className = '', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.setProperty('--magnetic-x', `${x * 0.18}px`);
    element.style.setProperty('--magnetic-y', `${y * 0.18}px`);
  };

  const handlePointerLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty('--magnetic-x', '0px');
    element.style.setProperty('--magnetic-y', '0px');
  };

  return (
    <a
      ref={ref}
      className={`magnetic-button magnetic-button--${variant} ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <span>{children}</span>
    </a>
  );
}
