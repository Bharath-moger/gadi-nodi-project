interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Center-aligned heading block (e.g. homepage sections). */
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "section-heading--center" : "";
  const rootClass = ["section-heading", alignClass, className].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={titleClassName}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
