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
import { Sparkles, Star } from "lucide-react";
import React from "react";
import { DescriptionLinkComponent } from "./description-link";
import { DetailedPlayer } from "./player-info";
const stringUrlExtractor = require("string-url-extractor");
import "./styles.css";
import { Spinner } from "@/components/ui/spinner";
import { type Player, getPlayerData } from "./get-player-data";
import {
  getPremierTeamDistribution,
  PremierTeam,
} from "./get-premier-team-distribution";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PremierTeamView } from "./premier-team-view";
import { Badge } from "@/components/ui/badge";

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

export default function DetailedView() {
  const [teamName, setTeamName] = React.useState<string | null>(
    document.querySelector(".css-1y3oy13")?.innerHTML ?? null,
  );
  console.log("Insights loading on: ", teamName);
  const [teamDescription, setTeamDescription] = React.useState<string | null>(
    document.querySelector(".css-1jhiktb")?.innerHTML ?? null,
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
      .querySelectorAll(".css-qamc6y")
      .entries()
      .toArray()
      .map(([_, elem]) => {
        return elem.innerHTML ?? "";
      }),
  );
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [playersLoading, setPlayersLoading] = React.useState<boolean>(false);
  const [teamLoading, setTeamLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!teamDescription) return;

    setTeamLinks(
      (stringUrlExtractor(teamDescription) as string[])
        .filter(
          (url) => url.split(".")[0].length > 0 && url.split(".")[0].length > 1,
        )
        .map((url) => {
          const formattedUrl = url
            .replace("https://", "")
            .replace("http://", "")
            .replace("www.", "");

          let parsedUrl: URL;
          try {
            parsedUrl = new URL(url);
          } catch {
            return {
              type: "Unknown",
              content: url,
              title: "unknown",
              display: formattedUrl,
            };
          }

          const host = parsedUrl.hostname.toLowerCase().replace(/^www\./, "");
          const path = parsedUrl.pathname;

          if (host === "x.com" || host === "twitter.com") {
            return {
              type: "Unknown",
              content: url,
              title: "x.com",
              display: formattedUrl,
            };
          } else if (host === "vlr.gg") {
            if (path.includes("/player/")) {
              return {
                type: "Player",
                content: url,
                title: "vlr.gg",
                display:
                  formattedUrl.split("/")[formattedUrl.split("/").length - 1],
              };
            } else if (path.includes("/team/")) {
              return {
                type: "Team",
                content: url,
                title: "vlr.gg",
                display:
                  formattedUrl.split("/")[formattedUrl.split("/").length - 1],
              };
            } else {
              return {
                type: "Unknown",
                content: url,
                title: "vlr.gg",
                display: formattedUrl,
              };
            }
          } else if (host === "tracker.gg") {
            if (path.includes("/valorant/premier/teams/")) {
              return {
                type: "Team",
                content: url,
                title: "tracker.gg",
                display: formattedUrl,
              };
            } else if (path.includes("/valorant/profile/riot/")) {
              return {
                type: "Player",
                content: url,
                title: "tracker.gg",
                display: decodeURIComponent(
                  path.replace("/valorant/profile/riot/", "").split("/")[0],
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
          } else if (host === "liquipedia.net") {
            return {
              type: "Unknown",
              content: url,
              title: "liquipedia.net",
              display: formattedUrl,
            };
          } else if (host === "gamersclub.gg") {
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

    setPlayersLoading(true);
    const fetchPlayers = async () => {
      // Optische Indikation: Wir fangen an zu laden
      setPlayers([]);

      const resolvedPlayers = await getPlayerData({
        playerTitles: playerNames,
        settings: {
          key: settingsKey || undefined,
          region: settingsRegion || undefined,
          platform: settingsPlatform || undefined,
        },
      });
      // Verhindere Update, falls der Effect bereits durch einen neuen überschrieben wurde
      if (!ignore) {
        setPlayers(resolvedPlayers);
      }
      setPlayersLoading(false);
    };

    fetchPlayers();

    // Cleanup-Funktion
    return () => {
      ignore = true;
    };
  }, [playerNames, settingsKey, settingsPlatform, settingsRegion]);
  const [teams, setTeams] = React.useState<PremierTeam[]>([]);
  React.useEffect(() => {
    let ignore = false;
    setTeamLoading(true);

    const fetchTeams = async () => {
      setTeams([]);

      const resolvedTeams = await getPremierTeamDistribution(players, {
        key: settingsKey,
        region: settingsRegion,
        platform: settingsPlatform,
      });
      if (!ignore) {
        setTeams(resolvedTeams);
      }

      setTeamLoading(false);
    };

    fetchTeams();

    return () => {
      ignore = true;
    };
  }, [players, settingsKey, settingsRegion, settingsPlatform]);
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
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-row flex-wrap items-center gap-1">
            {teamLinks.map((l, index) => (
              <DescriptionLinkComponent link={l} key={index} />
            ))}
          </div>
          <Accordion type="multiple">
            <AccordionItem value="players">
              <AccordionTrigger
                disabled={playersLoading}
                className="flex flex-row items-center gap-1 text-lg"
              >
                {playersLoading && <Spinner />} Players
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {players.map((p, index) => (
                    <DetailedPlayer player={p} key={index} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="premier-teams">
              <AccordionTrigger
                disabled={teamLoading || playersLoading}
                className="flex flex-row items-center gap-1 text-lg"
              >
                {(teamLoading || playersLoading) && <Spinner />}
                Potential fitting premier teams
                {!teamLoading && !playersLoading && (
                  <Badge className="group-hover:decoration-0">
                    <Sparkles />
                    NEW
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {teams.map((team) => (
                  <PremierTeamView
                    key={team.id}
                    team={team}
                    players={players}
                  />
                ))}
                {teams.length === 0 && (
                  <p>No player of this team is on a premier team</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <a
            target="_blank"
            href="https://github.com/leontm-dev/pracc-optimizer"
          >
            <Button variant={"secondary"}>
              <Star /> on GitHub or give feedback
            </Button>
          </a>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
