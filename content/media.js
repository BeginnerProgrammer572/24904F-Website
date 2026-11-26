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
      item(p.pbTournamentAngle, "League playoffs robot"),
      item(p.pbTournamentFront, "League playoffs robot, front"),
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
      item(p.pbState1, "State robot"),
      item(p.pbState2, "State robot, top view"),
      item(p.pbDrivetrain, "League playoffs robot drivetrain"),
      item(p.pbBenchFront, "League playoffs robot on the bench"),
    ],
  },
  {
    title: "Design and build",
    items: [item(p.drivetrainCad, "Drivetrain in CAD")],
  },
  {
    title: "Trophies",
    items: [item(p.plaquesSign, "Award plaques")],
  },
  { title: "RoboSaurus", items: dinos.map((src) => item(src, "RoboSaurus")) },
];
