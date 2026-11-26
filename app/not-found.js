import Link from "next/link";
import Page from "@/components/layout/Page";

export const metadata = { title: "Page not found", alternates: { canonical: null } };

export default function NotFound() {
  return (
    <Page hero={{ title: "Page not found" }}>
      <Link className="btn" href="/">Home</Link>
    </Page>
  );
}
