import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Player } from "./get-player-data";
import type { PremierTeam } from "./get-premier-team-distribution";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Props = {
  team: PremierTeam;
  players: Player[];
};
export function PremierTeamView(props: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="border-accent flex flex-col gap-1 border p-4 shadow-sm">
          <div className="flex flex-col gap-0">
            <div className="flex flex-row items-center gap-1 text-lg">
              <img className="size-6" src={props.team.icon} />
              <p>
                {props.team.name}
                <span className="text-muted-foreground">#{props.team.tag}</span>
              </p>
            </div>
          </div>
          <p className="text-muted-foreground flex flex-row items-center gap-1">
            <span>{props.team.placement.conference}</span>
            <span>•</span>
            <span>
              Division: {props.team.placement.division} #
              {props.team.placement.place}
            </span>
            <span>
              <span className="text-green-600">
                {props.team.stats.wins || 0}W
              </span>
              /
              <span className="text-red-600">
                {props.team.stats.losses || 0}L
              </span>
              /<span>{props.team.stats.matches}</span>
            </span>
          </p>
          <div className="flex flex-col gap-0">
            <Progress value={props.team.score * 100} className="bg-primary" />
            <p className="text-sm italic">
              {props.team.score * 100}% of available pracc players on this team
            </p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <div className="text-md flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="italic">Players (only from this pracc team)</p>
            <div className="flex flex-col gap-1">
              {props.team.players.map((puuid) => {
                const player = props.players.find(
                  (p) => p.possible && p.puuid === puuid,
                );
                if (!player) return <></>;
                return (
                  <div
                    key={player.name}
                    className="flex flex-row items-center gap-1"
                  >
                    <p>
                      {player.name}
                      <span className="text-muted-foreground">
                        #{player?.tag}
                      </span>
                    </p>
                    {!!player && <Badge>pracc</Badge>}
                  </div>
                );
              })}
            </div>
          </div>
          <Separator orientation="horizontal" />
          <div className="text-md flex flex-col gap-0">
            <p className="italic">Win-Lose-Ratio</p>
            <p className="flex flex-row flex-wrap items-center gap-1">
              <span className="text-green-600">
                {props.team.stats.wins} Wins
              </span>
              /
              <span className="text-red-600">
                {props.team.stats.losses} Losses
              </span>
              /<span>{props.team.stats.matches} Matches</span>
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
