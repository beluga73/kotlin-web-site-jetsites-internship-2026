import { useEffect, useState } from "react";
import { useTextStyles } from "@rescui/typography";
import { ThemeProvider } from "@rescui/ui-contexts";
import { cardCn } from "@rescui/card";
import cn from "classnames";
import { Section, Container } from "~/components/layout";
import { testimonialsData } from "./data";
import "./index.scss";

function UsageSectionContent() {
  const textCn = useTextStyles();
  const [sortByName, setSortByName] = useState(false);
  const [testimonials, setTestimonials] = useState(testimonialsData);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("kotlin-testimonials-order") === "name";
    setSortByName(saved);

    const sorted = [...testimonialsData].sort((a, b) => {
      if (saved) {
        return a.name.localeCompare(b.name);
      }
      return testimonialsData.indexOf(a) - testimonialsData.indexOf(b);
    });
    setTestimonials(sorted);
  }, []);

  const handleSort = () => {
    const newSortByName = !sortByName;
    setSortByName(newSortByName);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "kotlin-testimonials-order",
        newSortByName ? "name" : "default",
      );
    }

    const sorted = [...testimonialsData].sort((a, b) => {
      if (newSortByName) {
        return a.name.localeCompare(b.name);
      }
      return testimonialsData.indexOf(a) - testimonialsData.indexOf(b);
    });
    setTestimonials(sorted);
  };

  return (
    <Section className="usage-section">
      <Container>
        <h2 className={textCn("rs-h1")}>Who's Using Kotlin</h2>

        <div className="kto-grid kto-grid-gap-16 kto-offset-top-48">
          {testimonials.map((testimonial) => (
            <a
              key={testimonial.id}
              href={testimonial.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                cardCn({ theme: "light", mode: "classic", isClickable: true }),
                "usage-section__card kto-col-4 kto-col-md-6 kto-col-sm-12",
              )}
            >
              <img
                src={testimonial.logo}
                alt={testimonial.name}
                className={cn({
                  "usage-section__logo_spring": testimonial.id === "spring",
                })}
              />
              <p className={cn(textCn("rs-text-2"), "kto-offset-top-16")}>
                {testimonial.quote}
              </p>
            </a>
          ))}
        </div>

        <button
          onClick={handleSort}
          className={cn(textCn("rs-text-3"), "kto-offset-top-48")}
          style={{
            cursor: "pointer",
            color: "#7f52ff",
            border: "none",
            background: "none",
          }}
        >
          Sort {sortByName ? "by default" : "by name"}
        </button>
      </Container>
    </Section>
  );
}

export function UsageSection() {
  return (
    <ThemeProvider theme="light">
      <UsageSectionContent />
    </ThemeProvider>
  );
}
