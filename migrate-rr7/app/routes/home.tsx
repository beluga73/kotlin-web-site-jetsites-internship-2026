import type { Route } from "./+types/home";
import GlobalHeader from "@jetbrains/kotlin-web-site-ui/out/components/header";
import GlobalFooter from "@jetbrains/kotlin-web-site-ui/out/components/footer";
import { HeaderSection } from "~/sections/header";
import { LatestSection } from "~/sections/latest";
import { WhyKotlinSection } from "~/sections/why-kotlin";
import { UsageSection } from "~/sections/usage";
import { StartSection } from "~/sections/start";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kotlin Programming Language" },
    {
      name: "description",
      content:
        "Kotlin is a modern programming language designed to make developers happier.",
    },
  ];
}

export default function Home() {
  return (
    <div className="overview-page">
      <GlobalHeader searchConfig={{}} />

      <main>
        <HeaderSection />
        <LatestSection />
        <WhyKotlinSection />
        <UsageSection />
        <StartSection />
      </main>

      <GlobalFooter />
    </div>
  );
}
