// src/components/ui/Section.tsx
import React from "react";

type Props = React.PropsWithChildren<{
  className?: string;
  container?: boolean; // wrap with container max-w
}>;

const Section: React.FC<Props> = ({ children, className = "", container = true }) => (
  <section className={className}>
    <div className={container ? "container mx-auto px-6" : ""}>{children}</div>
  </section>
);

export default Section;
