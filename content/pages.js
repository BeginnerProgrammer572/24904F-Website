import { photos as p } from "./photos";

export const pages = {
  software: {
    hero: { title: "Software", photo: p.drivetrainCad, position: "center 40%" },
    cards: [
      { title: "Autonomous Planner", text: "A tool for planning autonomous routes on the field. It will be hosted here once it is ready." },
      { title: "CAD", text: "Robots are designed in CAD using Onshape and Fusion 360 before anything is built." },
      { title: "Robot Code", text: "Written in C++ on PROS with the EZ-Template library, including distance-sensor resets." },
      { title: "PID, Tracking Wheels and Motor Encoders", text: "PID control, tracking wheels and motor encoders work together so the robot drives and turns accurately and knows where it is on the field." },
    ],
  },
  team: {
    hero: { title: "The", em: "Team", photo: p.teamPhoto, position: "center 25%" },
    mascotLede: "Our team mascot, on every build.",
  },
  awards: { hero: { title: "Our", em: "Awards", photo: p.plaquesSign, position: "center 35%" } },
  media: { handle: "@foothill_robotics" },
  sponsors: {
    hero: { title: "Our", em: "Sponsors", photo: p.eventTable, position: "center 40%" },
    pitch: "Sponsor funds go to parts, event registration and travel for Foothill's competition teams. Reach out to learn more information.",
  },
};
