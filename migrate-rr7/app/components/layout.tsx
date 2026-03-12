export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`kto-layout-section${className ? " " + className : ""}`}
    >
      {children}
    </section>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="kto-layout-container">{children}</div>;
}
