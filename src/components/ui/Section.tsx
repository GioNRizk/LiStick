// src/components/ui/Section.tsx
import React from "react";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  /** When true, wraps children in a centered container with side padding */
  container?: boolean;
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className = "", container = true, ...rest }, ref) => {
    return (
      <section ref={ref} className={className} {...rest}>
        {container ? (
          <div className="container mx-auto px-6">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;
