import { config } from "@/content/config";

// Which analytics event a clicked link is, or null. Email addresses are never sent.
export function clickEvent(href) {
  if (!href) return null;
  if (href === config.sponsorPage) return ["sponsor_click", {}];
  if (href.startsWith("mailto:")) return ["email_click", {}];
  const account = href.match(/^https:\/\/(?:www\.)?instagram\.com\/([\w.]+)/)?.[1];
  return account ? ["instagram_click", { account }] : null;
}
