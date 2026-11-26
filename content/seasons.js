import { photos as p } from "./photos";

// Newest season first. Add a season by copying one object.
export const seasons = [
  {
    id: "26-27",
    game: "Override",
    level: "11th grade · 3rd season",
    photo: p.stadiumBench,
    position: "center 40%",
    blurb: "Bebop: a double reverse four-bar with a piston claw, programmed in C++ with PROS and EZ-Template.",
    stats: [
      { v: "Override", k: "Game" },
      { v: "Bebop", k: "Robot" },
      { v: "Design", k: "Award so far" },
      { v: "7-1", k: "League record" },
    ],
    robot: {
      name: "Bebop",
      desc: "A redesign is underway this season, with full CAD planned through late November and the build right after.",
      specs: [
        ["Drivetrain", "6 motors, 55 W (the rule cap)"],
        ["Lift", "Double reverse four-bar, 2 motors (22 W)"],
        ["Claw", "Piston open/close, plus a piston to rotate it vertical or horizontal"],
        ["Intake", "11 W, front"],
        ["Other", "Toggle mechanism, front mesh"],
        ["Code", "C++ on PROS with EZ-Template"],
        ["CAD", "Onshape and Fusion 360"],
      ],
    },
    results: [
      { when: "Nov 14, 2026", what: "League 2: 3-1", detail: "Three wins and one loss in qualification matches." },
      { when: "Oct 31, 2026", what: "Design Award, RoBOOtics SPOOKtacular", detail: "Hosted by Centennial High School. The award qualified the team for State.", win: true },
      { when: "Oct 17, 2026", what: "League 1: undefeated, 4-0", detail: "Won all four qualification matches.", win: true },
    ],
    events: [
      { date: "2026-09-26", name: "Cyberhawks Early Season Challenge" },
      { date: "2026-10-17", name: "League 1", detail: "First qualification matches that count toward standings" },
      { date: "2026-10-31", name: "RoBOOtics SPOOKtacular (Centennial)", detail: "Design Award, State qualified", win: true },
      { date: "2026-11-14", name: "League 2" },
      { date: "2026-12-12", name: "League 3", detail: "Final qualification matches, judging and alliance selection" },
      { date: "2027-01-09", name: "Playoffs and Awards" },
      { date: "2027-02-13", name: "Cal Poly San Luis Obispo", detail: "Central Coast" },
      { date: "2027-03-12", name: "State Championship", detail: "March 12-13" },
    ],
    sliders: [
      {
        title: "On the field and at tournaments",
        items: [
          { src: p.lastMatch, alt: "Last match" },
          { src: p.designAwardCart, alt: "Design Award at RoBOOtics SPOOKtacular" },
          { src: p.eventTable, alt: "On the pit table at a tournament" },
          { src: p.labField, alt: "Bebop on the practice field" },
        ],
      },
      {
        title: "In the lab and on the build",
        items: [
          { src: p.pushbackRobot, alt: "Our first Override design" },
          { src: p.bebopBack, alt: "Bebop mid-build" },
          { src: p.bebopSide, alt: "Bebop, lift extended", position: "center top" },
          { src: p.benchDino, alt: "Bebop on the lab bench" },
          { src: p.robotSide, alt: "Side view of the claw and lift" },
          { src: p.drivetrainCad, alt: "Drivetrain in CAD" },
        ],
      },
    ],
    awards: [{ title: "Design Award, State qualified", at: "RoBOOtics SPOOKtacular" }],
  },
  {
    id: "25-26",
    game: "Push Back",
    level: "10th grade · 2nd season",
    position: "center 45%",
    blurb: "A Build Award and a quarterfinal run at State, reached through a skills-only Last Chance tournament.",
    stats: [
      { v: "Build", k: "Award at State" },
      { v: "#7/35", k: "State qualifier rank" },
      { v: "QF", k: "State finish" },
      { v: "Judges", k: "Award at regionals" },
    ],
    robot: {
      name: "",
      desc: "This was the year the team moved to PROS (C++) and started using pneumatics.",
      specs: [
        ["Game", "Push Back"],
        ["Code", "C++ on PROS"],
        ["New this year", "Pneumatics"],
      ],
    },
    results: [
      { when: "League season", what: "Judges Award at regionals", detail: "Won at the league playoffs.", win: true },
      { when: "League playoffs", what: "Lost in the semifinals", detail: "That missed the direct route to State, so the team looked for another way in." },
      { when: "Last Chance", what: "Placed 8th and qualified for State", detail: "A skills-only tournament the team found through networking.", win: true },
      { when: "State at CSUB", what: "Build Award", detail: "Ranked #7 of 35 teams. Lost the quarterfinal after missing the match with a late-arrival penalty. Other teams started asking to ally.", win: true },
    ],
    events: [],
    sliders: [],
    awards: [
      { title: "Build Award", at: "State, CSUB" },
      { title: "State quarterfinalist", at: "Ranked 7th of 35 teams" },
      { title: "Judges Award", at: "Regional playoffs" },
    ],
  },
  {
    id: "24-25",
    game: "High Stakes",
    level: "9th grade · 1st season",
    position: "center 48%",
    blurb: "The year the Foothill team started. Funding, parts and the first competition season.",
    stats: [
      { v: "Judges", k: "Award at regionals" },
      { v: "C++", k: "Language" },
      { v: "1st", k: "Season for 24904F" },
    ],
    robot: {
      name: "",
      desc: "Funding came through the Kern High School District after several rejections, about $3,000 to launch the team.",
      specs: [
        ["Game", "High Stakes"],
        ["Code", "C++"],
        ["Funding", "District start-up funds, CDE Academy, school fundraisers"],
      ],
    },
    results: [{ when: "Regionals", what: "Judges Award", detail: "The team's first award.", win: true }],
    events: [],
    sliders: [],
    awards: [{ title: "Judges Award", at: "Regional playoffs" }],
  },
];

export const latestSeason = seasons[0];
export const seasonHref = (season) => `/seasons/${season.id}`;
export const getSeason = (id) => seasons.find((s) => s.id === id);
export const allAwards = seasons.flatMap((s) => s.awards.map((a) => ({ ...a, season: s.id })));
