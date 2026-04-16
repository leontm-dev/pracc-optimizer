import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import React from "react";
import { DescriptionLinkComponent } from "./description-link";
import { DetailedPlayer } from "./player-info";
const stringUrlExtractor = require("string-url-extractor");
import "./styles.css";

export type Player = {
  name: string;
  status: "found" | "not-found" | "unknown";
  tagLine?: string;
  trackerUrl?: string;
  rank?: string;
  rankIcon?: string;
  peak?: string;
  peakIcon?: string;
  peakSeason?: string;
};
export type TeamLinks = {
  title:
    | "vlr.gg"
    | "liquipedia.net"
    | "tracker.gg"
    | "x.com"
    | "gamersclub.gg"
    | "unknown";
  type: "Player" | "Team" | "Unknown";
  display: string;
  content: string;
};
const rankedTiers = [
  {
    tier: 0,
    tierName: "UNRANKED",
    division: "ECompetitiveDivision::UNRANKED",
    divisionName: "UNRANKED",
    color: "ffffffff",
    backgroundColor: "00000000",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/0/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/0/largeicon.png",
    rankTriangleDownIcon: null,
    rankTriangleUpIcon: null,
  },
  {
    tier: 1,
    tierName: "Unused1",
    division: "ECompetitiveDivision::INVALID",
    divisionName: "Unused1",
    color: "ffffffff",
    backgroundColor: "00000000",
    smallIcon: null,
    largeIcon: null,
    rankTriangleDownIcon: null,
    rankTriangleUpIcon: null,
  },
  {
    tier: 2,
    tierName: "Unused2",
    division: "ECompetitiveDivision::INVALID",
    divisionName: "Unused2",
    color: "ffffffff",
    backgroundColor: "00000000",
    smallIcon: null,
    largeIcon: null,
    rankTriangleDownIcon: null,
    rankTriangleUpIcon: null,
  },
  {
    tier: 3,
    tierName: "IRON 1",
    division: "ECompetitiveDivision::IRON",
    divisionName: "IRON",
    color: "4f514fff",
    backgroundColor: "828282ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/3/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/3/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/3/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/3/ranktriangleupicon.png",
  },
  {
    tier: 4,
    tierName: "IRON 2",
    division: "ECompetitiveDivision::IRON",
    divisionName: "IRON",
    color: "4f514fff",
    backgroundColor: "828282ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/4/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/4/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/4/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/4/ranktriangleupicon.png",
  },
  {
    tier: 5,
    tierName: "IRON 3",
    division: "ECompetitiveDivision::IRON",
    divisionName: "IRON",
    color: "4f514fff",
    backgroundColor: "828282ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/5/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/5/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/5/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/5/ranktriangleupicon.png",
  },
  {
    tier: 6,
    tierName: "BRONZE 1",
    division: "ECompetitiveDivision::BRONZE",
    divisionName: "BRONZE",
    color: "a5855dff",
    backgroundColor: "7c5522ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/6/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/6/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/6/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/6/ranktriangleupicon.png",
  },
  {
    tier: 7,
    tierName: "BRONZE 2",
    division: "ECompetitiveDivision::BRONZE",
    divisionName: "BRONZE",
    color: "a5855dff",
    backgroundColor: "7c5522ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/7/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/7/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/7/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/7/ranktriangleupicon.png",
  },
  {
    tier: 8,
    tierName: "BRONZE 3",
    division: "ECompetitiveDivision::BRONZE",
    divisionName: "BRONZE",
    color: "a5855dff",
    backgroundColor: "7c5522ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/8/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/8/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/8/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/8/ranktriangleupicon.png",
  },
  {
    tier: 9,
    tierName: "SILVER 1",
    division: "ECompetitiveDivision::SILVER",
    divisionName: "SILVER",
    color: "bbc2c2ff",
    backgroundColor: "d1d1d1ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/9/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/9/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/9/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/9/ranktriangleupicon.png",
  },
  {
    tier: 10,
    tierName: "SILVER 2",
    division: "ECompetitiveDivision::SILVER",
    divisionName: "SILVER",
    color: "bbc2c2ff",
    backgroundColor: "d1d1d1ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/10/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/10/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/10/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/10/ranktriangleupicon.png",
  },
  {
    tier: 11,
    tierName: "SILVER 3",
    division: "ECompetitiveDivision::SILVER",
    divisionName: "SILVER",
    color: "bbc2c2ff",
    backgroundColor: "d1d1d1ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/11/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/11/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/11/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/11/ranktriangleupicon.png",
  },
  {
    tier: 12,
    tierName: "GOLD 1",
    division: "ECompetitiveDivision::GOLD",
    divisionName: "GOLD",
    color: "eccf56ff",
    backgroundColor: "eec56aff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/12/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/12/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/12/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/12/ranktriangleupicon.png",
  },
  {
    tier: 13,
    tierName: "GOLD 2",
    division: "ECompetitiveDivision::GOLD",
    divisionName: "GOLD",
    color: "eccf56ff",
    backgroundColor: "eec56aff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/13/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/13/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/13/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/13/ranktriangleupicon.png",
  },
  {
    tier: 14,
    tierName: "GOLD 3",
    division: "ECompetitiveDivision::GOLD",
    divisionName: "GOLD",
    color: "eccf56ff",
    backgroundColor: "eec56aff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/14/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/14/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/14/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/14/ranktriangleupicon.png",
  },
  {
    tier: 15,
    tierName: "PLATINUM 1",
    division: "ECompetitiveDivision::PLATINUM",
    divisionName: "PLATINUM",
    color: "59a9b6ff",
    backgroundColor: "00c7c0ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/15/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/15/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/15/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/15/ranktriangleupicon.png",
  },
  {
    tier: 16,
    tierName: "PLATINUM 2",
    division: "ECompetitiveDivision::PLATINUM",
    divisionName: "PLATINUM",
    color: "59a9b6ff",
    backgroundColor: "00c7c0ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/16/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/16/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/16/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/16/ranktriangleupicon.png",
  },
  {
    tier: 17,
    tierName: "PLATINUM 3",
    division: "ECompetitiveDivision::PLATINUM",
    divisionName: "PLATINUM",
    color: "59a9b6ff",
    backgroundColor: "00c7c0ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/17/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/17/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/17/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/17/ranktriangleupicon.png",
  },
  {
    tier: 18,
    tierName: "DIAMOND 1",
    division: "ECompetitiveDivision::DIAMOND",
    divisionName: "DIAMOND",
    color: "b489c4ff",
    backgroundColor: "763bafff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/18/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/18/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/18/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/18/ranktriangleupicon.png",
  },
  {
    tier: 19,
    tierName: "DIAMOND 2",
    division: "ECompetitiveDivision::DIAMOND",
    divisionName: "DIAMOND",
    color: "b489c4ff",
    backgroundColor: "763bafff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/19/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/19/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/19/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/19/ranktriangleupicon.png",
  },
  {
    tier: 20,
    tierName: "DIAMOND 3",
    division: "ECompetitiveDivision::DIAMOND",
    divisionName: "DIAMOND",
    color: "b489c4ff",
    backgroundColor: "763bafff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/ranktriangleupicon.png",
  },
  {
    tier: 21,
    tierName: "ASCENDANT 1",
    division: "ECompetitiveDivision::ASCENDANT",
    divisionName: "ASCENDANT",
    color: "6ae2afff",
    backgroundColor: "1c7245ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/ranktriangleupicon.png",
  },
  {
    tier: 22,
    tierName: "ASCENDANT 2",
    division: "ECompetitiveDivision::ASCENDANT",
    divisionName: "ASCENDANT",
    color: "6ae2afff",
    backgroundColor: "1c7245ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/ranktriangleupicon.png",
  },
  {
    tier: 23,
    tierName: "ASCENDANT 3",
    division: "ECompetitiveDivision::ASCENDANT",
    divisionName: "ASCENDANT",
    color: "6ae2afff",
    backgroundColor: "1c7245ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/23/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/23/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/23/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/23/ranktriangleupicon.png",
  },
  {
    tier: 24,
    tierName: "IMMORTAL 1",
    division: "ECompetitiveDivision::IMMORTAL",
    divisionName: "IMMORTAL",
    color: "bb3d65ff",
    backgroundColor: "ff5551ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/24/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/24/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/24/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/24/ranktriangleupicon.png",
  },
  {
    tier: 25,
    tierName: "IMMORTAL 2",
    division: "ECompetitiveDivision::IMMORTAL",
    divisionName: "IMMORTAL",
    color: "bb3d65ff",
    backgroundColor: "ff5551ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/25/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/25/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/25/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/25/ranktriangleupicon.png",
  },
  {
    tier: 26,
    tierName: "IMMORTAL 3",
    division: "ECompetitiveDivision::IMMORTAL",
    divisionName: "IMMORTAL",
    color: "bb3d65ff",
    backgroundColor: "ff5551ff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/26/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/26/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/26/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/26/ranktriangleupicon.png",
  },
  {
    tier: 27,
    tierName: "RADIANT",
    division: "ECompetitiveDivision::RADIANT",
    divisionName: "RADIANT",
    color: "ffffaaff",
    backgroundColor: "ffedaaff",
    smallIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/27/smallicon.png",
    largeIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/27/largeicon.png",
    rankTriangleDownIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/27/ranktriangledownicon.png",
    rankTriangleUpIcon:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/27/ranktriangleupicon.png",
  },
];
export default function DetailedView() {
  const [teamName, setTeamName] = React.useState<string | null>(
    document.querySelector(".sc-fHSyak")?.innerHTML ?? null,
  );
  const [teamDescription, setTeamDescription] = React.useState<string | null>(
    document.getElementById("mui-5")?.innerHTML ?? null,
  );
  const [settingsPlatform, setSettingsPlatform] = React.useState<string | null>(
    null,
  );
  const [settingsRegion, setSettingsRegion] = React.useState<string | null>(
    null,
  );
  const [settingsKey, setSettingsKey] = React.useState<string | null>(null);
  React.useEffect(() => {
    browser.storage.local
      .get("pracc-optimizer-platform")
      .then((res) => {
        if (
          !res["pracc-optimizer-platform"] ||
          typeof res["pracc-optimizer-platform"] !== "string"
        )
          return setSettingsPlatform(null);

        return setSettingsPlatform(res["pracc-optimizer-platform"]);
      })
      .catch((err) => {
        console.error(err);
        return setSettingsPlatform(null);
      });
    browser.storage.local
      .get("pracc-optimizer-region")
      .then((res) => {
        if (
          !res["pracc-optimizer-region"] ||
          typeof res["pracc-optimizer-region"] !== "string"
        )
          return setSettingsRegion(null);

        return setSettingsRegion(res["pracc-optimizer-region"]);
      })
      .catch((err) => {
        console.error(err);
        return setSettingsRegion(null);
      });
    browser.storage.local
      .get("pracc-optimizer-key")
      .then((res) => {
        if (
          !res["pracc-optimizer-key"] ||
          typeof res["pracc-optimizer-key"] !== "string"
        )
          return setSettingsKey(null);

        return setSettingsKey(res["pracc-optimizer-key"]);
      })
      .catch((err) => {
        console.error(err);
        return setSettingsKey(null);
      });
  }, []);
  const [teamLinks, setTeamLinks] = React.useState<TeamLinks[]>([]);
  const [playerNames, setPlayerNames] = React.useState<string[]>(
    document
      .querySelectorAll(".css-1a83j2z")
      .entries()
      .toArray()
      .map(([_, elem]) => {
        return elem.innerHTML ?? "";
      }),
  );
  const [players, setPlayers] = React.useState<Player[]>([]);
  React.useEffect(() => {
    if (!teamDescription) return;

    setTeamLinks(
      (stringUrlExtractor(teamDescription) as string[]).map((url) => {
        const formattedUrl = url
          .replace("https://", "")
          .replace("http://", "")
          .replace("www.", "");
        if (
          formattedUrl.startsWith("x.com") ||
          formattedUrl.startsWith("twitter.com")
        ) {
          return {
            type: "Unknown",
            content: url,
            title: "x.com",
            display: formattedUrl,
          };
        } else if (formattedUrl.startsWith("vlr.gg")) {
          if (formattedUrl.includes("/player/")) {
            return {
              type: "Player",
              content: url,
              title: "vlr.gg",
              display: formattedUrl,
            };
          } else if (formattedUrl.includes("/team/")) {
            return {
              type: "Team",
              content: url,
              title: "vlr.gg",
              display: formattedUrl,
            };
          } else {
            return {
              type: "Unknown",
              content: url,
              title: "vlr.gg",
              display: formattedUrl,
            };
          }
        } else if (formattedUrl.startsWith("tracker.gg")) {
          if (formattedUrl.includes("/valorant/premier/teams/")) {
            return {
              type: "Team",
              content: url,
              title: "tracker.gg",
              display: formattedUrl,
            };
          } else if (formattedUrl.includes("/valorant/profile/riot/")) {
            return {
              type: "Player",
              content: url,
              title: "tracker.gg",
              display: decodeURIComponent(
                formattedUrl
                  .replace("tracker.gg/valorant/profile/riot/", "")
                  .split("/")[0],
              ),
            };
          } else {
            return {
              type: "Unknown",
              content: url,
              title: "tracker.gg",
              display: formattedUrl,
            };
          }
        } else if (formattedUrl.startsWith("liquipedia.net")) {
          return {
            type: "Unknown",
            content: url,
            title: "liquipedia.net",
            display: formattedUrl,
          };
        } else if (formattedUrl.startsWith("gamersclub.gg")) {
          return {
            type: "Team",
            content: url,
            title: "gamersclub.gg",
            display: formattedUrl,
          };
        } else {
          return {
            type: "Unknown",
            content: url,
            title: "unknown",
            display: formattedUrl,
          };
        }
      }),
    );
  }, [teamDescription]);
  React.useEffect(() => {
    // Flag um Updates durch veraltete useEffect-Läufe zu unterbinden (Race Conditions vermeiden)
    let ignore = false;

    const fetchPlayers = async () => {
      // Optische Indikation: Wir fangen an zu laden
      setPlayers([]);

      const playerPromises = playerNames.map(
        async (playerName): Promise<Player> => {
          const trimmedName = playerName.trim();

          if (
            !trimmedName.includes("#") ||
            trimmedName.split("#").length !== 2
          ) {
            return { name: trimmedName, status: "unknown" };
          }

          const [name, tagLine] = trimmedName.split("#");
          const trackerUrl = `https://tracker.gg/valorant/profile/riot/${encodeURIComponent(name + "#" + tagLine)}/overview`;

          if (!settingsPlatform || !settingsRegion || !settingsKey) {
            return {
              name,
              tagLine,
              trackerUrl,
              status: "unknown",
            };
          }

          try {
            const res = await fetch(
              `https://api.henrikdev.xyz/valorant/v3/mmr/${settingsRegion}/${settingsPlatform}/${name}/${tagLine}`,
              {
                method: "GET",
                headers: { Authorization: settingsKey },
              },
            );

            if (!res.ok) {
              // Falls der Request fehlschlägt
              return { name, tagLine, trackerUrl, status: "not-found" };
            }

            const responseObject = await res.json();
            const data = responseObject?.data;

            if (!data) {
              return { name, tagLine, trackerUrl, status: "not-found" };
            }

            return {
              name,
              tagLine,
              trackerUrl,
              status: "found",
              peak: data.peak?.tier?.name,
              peakSeason: data.peak?.season?.short,
              peakIcon:
                rankedTiers.find((tier) => tier.tier === data.peak?.tier?.id)
                  ?.largeIcon ?? undefined,
              rank: data.current?.tier?.name,
              rankIcon:
                rankedTiers.find((tier) => tier.tier === data.current?.tier?.id)
                  ?.largeIcon ?? undefined,
            };
          } catch (err) {
            console.error(err);
            return { name, tagLine, trackerUrl, status: "not-found" };
          }
        },
      );

      // Warte auf alle API Requests gleichzeitig
      const resolvedPlayers = await Promise.all(playerPromises);

      // Verhindere Update, falls der Effect bereits durch einen neuen überschrieben wurde
      if (!ignore) {
        setPlayers(resolvedPlayers);
      }
    };

    fetchPlayers();

    // Cleanup-Funktion
    return () => {
      ignore = true;
    };
  }, [playerNames, settingsKey, settingsPlatform, settingsRegion]);
  return (
    <TooltipProvider>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-xl">
            Insights on{" "}
            <span className="text-primary font-bold">{teamName}</span>
          </CardTitle>
          <CardDescription>brought to you by pracc-optimizer</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="decoration-primary italic underline">Team-URLs</h1>
            <div className="flex flex-row flex-wrap gap-1">
              {teamLinks.map((l, index) => (
                <DescriptionLinkComponent link={l} key={index} />
              ))}
              {teamLinks.length === 0 && <p>(No urls provided)</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="decoration-primary italic underline">Players</h1>
            {players.map((p, index) => (
              <DetailedPlayer player={p} key={index} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <a
            target="_blank"
            href="https://github.com/leontm-dev/pracc-optimizer"
          >
            <Button variant={"outline"}>
              <Star /> on GitHub
            </Button>
          </a>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
