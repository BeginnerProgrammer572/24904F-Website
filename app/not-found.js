import Link from "next/link";
import Page from "@/components/layout/Page";

export default function NotFound() {
  return (
    <Page hero={{ title: "Page not found" }}>
      <Link className="btn" href="/">Home</Link>
    </Page>
  );
}
