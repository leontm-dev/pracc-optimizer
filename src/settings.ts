// Imports

import {
  LucideProps,
  ChartNoAxesCombined,
  Link,
  Shield,
  FolderHeart,
  PowerCircle,
} from "lucide-react";

// Code

type Setting = {
  name: string;
  description: string;
  value: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};
export const settings: {
  global: Setting[];
  valorant: Setting[];
  cs2: Setting[];
  r6: Setting[];
  halo: Setting[];
  "spectre-divide": Setting[];
  "rocket-league": Setting[];
  "wild-rift": Setting[];
  deadlock: Setting[];
  lol: Setting[];
  dota: Setting[];
} = {
  global: [
    {
      name: "Block list",
      description:
        "Block teams for free. Adds a button to every team page and a checkbox to the search page to only see not blocked teams.",
      value: "block-list",
      icon: Shield,
    },
    {
      name: "Favorite list",
      description:
        "Favorite teams for free. Adds a button to every team page and a checkbox to the search page to only see favourited teams.",
      value: "favorites",
      icon: FolderHeart,
    },
  ],
  valorant: [
    {
      name: "Tracker Buttons",
      description:
        "Add buttons next to player names to quickly get to their VALORANT tracker profile.",
      value: "tracker-buttons",
      icon: ChartNoAxesCombined,
    },
    {
      name: "Description Links",
      description:
        "Filter links from the team description and display them in a separate container to easily go to the references the team gave you.",
      value: "description-links",
      icon: Link,
    },
    {
      name: "Auto Match Dates",
      description: "Automatically turn on match dates in the pracc search page",
      value: "auto-match-dates",
      icon: PowerCircle,
    },
  ],
  cs2: [],
  r6: [],
  halo: [],
  "spectre-divide": [],
  "rocket-league": [],
  "wild-rift": [],
  deadlock: [],
  lol: [],
  dota: [],
};
