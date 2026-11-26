import { photos as p } from "./photos";

// Files that show the same shot. A page shows at most one of each pair, and
// keeps the first of the two.
export const sameShot = [
  [p.bebopBack, p.buildBench],
  [p.bebopSide, p.liftBench],
  // pushback-build.jpg also matches pit-work.jpg; the site does not include it.
  [p.stadiumBench, p.stadiumTall],
  [p.plaquesSign, p.plaquesSign2],
  [p.plaquesSign, p.trophyDesign],
  [p.plaquesSign, p.trophyJudges],
];
