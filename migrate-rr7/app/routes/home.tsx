import type { Route } from "./+types/home";
import GlobalHeader from "@jetbrains/kotlin-web-site-ui/out/components/header";
import GlobalFooter from "@jetbrains/kotlin-web-site-ui/out/components/footer";

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
      <GlobalFooter />
    </div>
  );
}
