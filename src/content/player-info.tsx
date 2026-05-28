import { Button } from "@/components/ui/button";
import type { Player } from "./get-player-data";

type Props = {
  player: Player;
};

export function DetailedPlayer({ player }: Props) {
  return (
    <div className="flex flex-row items-center gap-4 border p-2 shadow-sm">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="flex flex-row items-center gap-0 text-lg">
            <h1>{player.name || player.title}</h1>
            {player.tag && (
              <span className="text-muted-foreground">#{player.tag}</span>
            )}
          </div>
          {player.name && player.tag && player.possible && (
            <a
              href={new URL(
                `https://tracker.gg/valorant/profile/riot/${encodeURIComponent(player.name + "#" + player.tag)}`,
              ).toString()}
              title={`Status: ${player.status}`}
              target="_blank"
            >
              <Button variant={"ghost"} size={"icon"} className="size-6">
                <img
                  className="object-contain"
                  src={
                    "https://cdn.brandfetch.io/id1IgSpVrO/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1773155737896"
                  }
                />
              </Button>
            </a>
          )}
        </div>
        {player.possible && (
          <div className="flex flex-row items-center gap-2">
            {player.rank && (
              <div className="flex flex-row items-center gap-1 text-sm">
                {player.rank.icon && (
                  <img className="size-4" src={player.rank.icon} />
                )}
                {player.rank.name ?? "Unknown"}
              </div>
            )}
            {player.peakRank && player.rank && <span>•</span>}
            {player.peakRank && (
              <div className="flex flex-row items-center gap-1 text-sm">
                {player.peakRank.icon && (
                  <img className="size-4" src={player.peakRank.icon} />
                )}
                {player.peakRank.name ?? "Unknown"} (
                {player.peakRank.season ?? "Season: Unknown"})
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
