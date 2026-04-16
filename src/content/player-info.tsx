import { Button } from "@/components/ui/button";
import { Player } from "./detailed-view";

type Props = {
  player: Player;
};

export function DetailedPlayer({ player }: Props) {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="flex flex-row items-center gap-0 text-lg">
            <h1>{player.name}</h1>
            {player.tagLine && (
              <span className="text-muted-foreground">#{player.tagLine}</span>
            )}
          </div>
          {player.trackerUrl && (
            <a
              href={player.trackerUrl}
              title={`Status: ${player.status}`}
              target="_blank"
            >
              <Button variant={"ghost"} size={"icon"}>
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
        <div className="flex flex-row items-center gap-2">
          {player.rank && (
            <div className="flex flex-row items-center gap-1">
              {player.rankIcon && (
                <img className="size-6" src={player.rankIcon} />
              )}
              {player.rank}
            </div>
          )}
          {player.peak && player.rank && <span>•</span>}
          {player.peak && (
            <div className="flex flex-row items-center gap-1">
              {player.peakIcon && (
                <img className="size-6" src={player.peakIcon} />
              )}
              {player.peak} ({player.peakSeason})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
