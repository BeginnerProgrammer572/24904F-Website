// Swap the preview URLs for live ones here.
export const config = {
  sponsorPage: "https://claude.ai/artifact/29XW56T1C3PteqNYJDSdLH",
  recruitPage: "https://claude.ai/artifact/VcYSGs4gTCxsK9TEjZ2oMX",
  instagram: "https://www.instagram.com/foothill_robotics/",
  coachInstagram: "https://www.instagram.com/roboticsatthehill",
};

// The live address, used for social previews, the sitemap and canonical links.
// Set NEXT_PUBLIC_SITE_URL; otherwise Vercel's production address is used.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const site = {
  team: "Trojan Horse",
  number: "24904F",
  builtBy: "Bryan Sobalvarro",
  school: "Foothill High School VEX Robotics",
  title: "Trojan Horse 24904F | Foothill High School VEX Robotics",
  description:
    "Team 24904F, Foothill High School VEX V5 Robotics, Bakersfield CA. Season history, robots, sponsors.",
};
