import { site } from "@/content/config";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <span>{site.school}</span>
        <span>Designed and built by <b>{site.builtBy}</b></span>
      </div>
    </footer>
  );
}
