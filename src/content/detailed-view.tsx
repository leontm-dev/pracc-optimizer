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
import { PlusCircle, Send, Sparkles, Star } from "lucide-react";
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
import { TeamCommentComponent } from "./team-comment";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

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

export type TeamComment = {
  createdAt: string;
  content: string;
  pinned: boolean;
};

export default function DetailedView() {
  const [teamName, setTeamName] = React.useState<string | null>(
    document.querySelector(".css-1y3oy13")?.innerHTML ?? null,
  );

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
  const [settingsDebug, setSettingsDebug] = React.useState<boolean | null>(
    null,
  );
  console.log("Insights loading on: ", teamName);
  const [comments, setComments] = React.useState<TeamComment[]>([]);
  React.useEffect(() => {
    async function loadData() {
      const localStorageResponse = await browser.storage.local.get();
      setSettingsPlatform(
        String(localStorageResponse["pracc-optimizer-platform"]) || null,
      );
      setSettingsRegion(
        String(localStorageResponse["pracc-optimizer-region"]) || null,
      );
      setSettingsKey(
        String(localStorageResponse["pracc-optimizer-key"]) || null,
      );
      setSettingsDebug(
        String(localStorageResponse["pracc-optimizer-debug"]) === "true" ||
          null,
      );
    }
    loadData();
  }, []);
  React.useEffect(() => {
    const id = window.location.pathname.replace("/team/", "");

    async function loadData() {
      const localStorage = await browser.storage.local.get();

      if (!Array.isArray(localStorage[`pracc-optimizer-comments-${id}`]))
        return;

      setComments(
        localStorage[`pracc-optimizer-comments-${id}`] as TeamComment[],
      );
    }

    loadData();
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
    let ignore = false;

    setPlayersLoading(true);
    const fetchPlayers = async () => {
      setPlayers([]);

      const resolvedPlayers = await getPlayerData({
        playerTitles: playerNames,
        settings: {
          key: settingsKey || undefined,
          region: settingsRegion || undefined,
          platform: settingsPlatform || undefined,
        },
      });

      if (!ignore) {
        setPlayers(resolvedPlayers);
      }
      setPlayersLoading(false);
    };

    fetchPlayers();

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
        debug: settingsDebug,
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

  const [newCommentValue, setNewCommentValue] = React.useState<string>("");
  React.useEffect(() => {
    const id = window.location.pathname.replace("/team/", "");
    const key = `pracc-optimizer-comments-${id}`;
    const record: Record<string, unknown> = {};
    record[key] = comments;
    browser.storage.local
      .set(record)
      .then(() => {
        settingsDebug && console.log("Added comment");
      })
      .catch((err) => console.error("Couldn't add comment", err));
  }, [comments]);
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
          <div className="flex flex-row flex-wrap items-center gap-1">
            {comments
              .sort((a, b) => {
                if (b.pinned !== a.pinned) {
                  return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
                }
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })
              .map((c) => (
                <TeamCommentComponent
                  key={c.createdAt}
                  comment={c}
                  removeComment={(id) =>
                    setComments((prev) =>
                      prev.filter((p) => p.createdAt !== id),
                    )
                  }
                  togglePinnedState={(id) =>
                    setComments((prev) =>
                      prev.map((p) => {
                        if (p.createdAt === id) {
                          return { ...p, pinned: !p.pinned };
                        }

                        return p;
                      }),
                    )
                  }
                />
              ))}
            <InputGroup>
              <InputGroupAddon align={"inline-start"}>
                <PlusCircle />
              </InputGroupAddon>
              <InputGroupInput
                onChange={(ev) => setNewCommentValue(ev.target.value)}
                type="text"
                placeholder="Add new comment to this team"
              />
              <InputGroupAddon align={"inline-end"}>
                {newCommentValue.length !== 0 && (
                  <InputGroupButton
                    onClick={() => {
                      if (newCommentValue.length === 0) return;

                      setComments((prev) => [
                        ...prev,
                        {
                          createdAt: new Date().toString(),
                          content: newCommentValue,
                          pinned: false,
                        },
                      ]);
                      setNewCommentValue("");
                    }}
                  >
                    <Send />
                  </InputGroupButton>
                )}
              </InputGroupAddon>
            </InputGroup>
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
