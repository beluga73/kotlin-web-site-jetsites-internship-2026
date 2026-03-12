import { useEffect, useState } from "react";
import Button from "@rescui/button";
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("kotlin-testimonials-order") === "name";
    setSortByName(saved);
  }, []);

  const sortedTestimonials = sortByName
    ? [...testimonialsData].sort((a, b) => a.name.localeCompare(b.name))
    : testimonialsData;

  return (
    <Section className="usage-section">
      <Container>
        <h2 className={textCn("rs-hero")}>Kotlin Usage Highlights</h2>

        <div
          className="kto-offset-top-16"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            mode="outline"
            size="s"
            onClick={() => {
              const next = !sortByName;
              setSortByName(next);
              localStorage.setItem(
                "kotlin-testimonials-order",
                next ? "name" : "default",
              );
            }}
          >
            Sort: {sortByName ? "A-Z" : "Default"}
          </Button>
        </div>

        <div className="kto-grid kto-grid-gap-16 kto-offset-top-48">
          {sortedTestimonials.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                cardCn({ theme: "light", mode: "classic", isClickable: true }),
                "usage-section__card",
                "kto-col-4 kto-col-md-6 kto-col-sm-12",
              )}
            >
              <img
                src={item.logo}
                alt={item.name}
                className={cn("usage-section__logo", {
                  "usage-section__logo_spring": item.id === "spring",
                })}
              />
              <p className={cn(textCn("rs-text-2"), "kto-offset-top-8")}>
                {item.quote}
              </p>
            </a>
          ))}
        </div>
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
