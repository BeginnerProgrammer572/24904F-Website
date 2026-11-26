import { photos as p } from "./photos";
import { latestSeason, seasons } from "./seasons";

export const home = {
  hero: { photo: p.teamPhoto, position: "center 25%" },
  chips: [
    { v: String(seasons.length), k: "Seasons" },
    // Not derivable from the awards list, so these two are kept by hand.
    { v: "4", k: "Awards" },
    { v: "2", k: "State qualifications" },
    { v: latestSeason.game, k: `${latestSeason.id} game` },
  ],
  seasonsLede: "24904F is on its 3rd season.",
  competition: [
    { src: p.lastMatch, alt: "Last match", tall: true, position: "30% 8%" },
    { src: p.eventTable, alt: "Pit table" },
    { src: p.pitWork, alt: "Working on the robot in the pit" },
  ],
  buildLede: "CAD in Onshape and Fusion 360, built and tested in the Foothill lab.",
  build: [
    { src: p.drivetrainCad, alt: "Drivetrain in CAD" },
    { src: p.buildBench, alt: "A robot mid-build" },
    { src: p.liftBench, alt: "Testing a lift" },
  ],
};
