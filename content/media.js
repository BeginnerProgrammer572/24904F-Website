import { photos as p } from "./photos";

const item = (src, alt, extra) => ({ src, alt, ...extra });
const dinos = [p.robosaurus1, p.robosaurus2, p.robosaurus3];

export const trophies = [item(p.trophyDesign, "Design Award"), item(p.trophyJudges, "Judges' Award")];

export const robosaurus = dinos.map((src) => item(src, "RoboSaurus, the team mascot"));

export const media = [
  {
    title: "Competition",
    items: [
      item(p.lastMatch, "Last match"),
      item(p.designAwardCart, "Design Award at RoBOOtics SPOOKtacular"),
      item(p.eventTable, "Pit table at a tournament"),
      item(p.pitWork, "Working on the robot in the pit"),
    ],
  },
  {
    title: "Robots",
    items: [
      item(p.labField, "Bebop on the practice field"),
      item(p.bebopSide, "Bebop, lift extended", { position: "center top" }),
      item(p.bebopBack, "Bebop mid-build"),
      item(p.benchDino, "Bebop on the lab bench"),
      item(p.robotSide, "Claw and lift, side view"),
      item(p.pushbackRobot, "Our first Override design"),
      item(p.stadiumBench, "Bebop at the stadium"),
    ],
  },
  {
    title: "Design and build",
    items: [
      item(p.drivetrainCad, "Drivetrain in CAD"),
      item(p.gears, "Gear train detail"),
    ],
  },
  {
    title: "Trophies",
    items: [item(p.plaquesSign, "Award plaques")],
  },
  { title: "RoboSaurus", items: dinos.map((src) => item(src, "RoboSaurus")) },
];
