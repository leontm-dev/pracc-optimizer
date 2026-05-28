import { getRankedTierIcon } from "./ranked-tiers";

export type Player = {
  title: string;
  name: string | null;
  tag: string | null;
} & (PossiblePlayer | ImpossiblePlayer);

type PossiblePlayer = {
  possible: true;
  status: "found" | "unknown";
  puuid: string;
  peakRank: {
    name: string | undefined;
    season: string | undefined;
    icon: string | undefined;
  };
  rank: {
    name: string | undefined;
    icon: string | undefined;
  };
};
type ImpossiblePlayer = {
  possible: false;
};

type FunctionProps = {
  playerTitles: string[];
  settings: {
    platform?: string;
    region?: string;
    key?: string;
  };
};

function trimPlayerTitle(title: string): {
  name: string | null;
  tag: string | null;
} {
  const splitTitle = title.trim().split("#");
  if (splitTitle.length !== 2) return { name: null, tag: null };

  const name = splitTitle[0].trim();
  const tag = splitTitle[1].trim();

  return { name, tag };
}
export async function getPlayerData({
  playerTitles,
  settings,
}: FunctionProps): Promise<Player[]> {
  const resolvedPlayers = await Promise.all(
    playerTitles.map(async (playerTitle) => {
      const { name, tag } = trimPlayerTitle(playerTitle);
      if (!name || !tag)
        return {
          possible: false,
          name: null,
          tag: null,
          title: playerTitle,
        } as Player; // return for no proper tag or name

      if (!settings.key || !settings.platform || !settings.region)
        return {
          possible: true,
          name,
          tag,
          title: playerTitle,
          status: "unknown",
        } as Player;

      const playerCheck = await fetch(
        `https://api.henrikdev.xyz/valorant/v3/mmr/${settings.region}/${settings.platform}/${name}/${tag}`,
        {
          method: "GET",
          headers: { Authorization: settings.key },
        },
      );
      if (!playerCheck.ok)
        return { name, tag, possible: false, title: playerTitle } as Player; // return for failing player check
      const playerCheckData = await playerCheck.json();
      if (!playerCheckData)
        return { name, tag, possible: false, title: playerTitle } as Player; // return for missing player data

      return {
        name,
        tag,
        possible: true,
        status: "found",
        puuid: playerCheckData.data?.account?.puuid || "",
        peakRank: {
          name: playerCheckData.data?.peak?.tier?.name,
          season: playerCheckData.data?.peak?.season?.short,
          icon: getRankedTierIcon(playerCheckData.data?.peak?.tier.id),
        },
        title: playerTitle,
        rank: {
          name: playerCheckData.data?.current?.tier?.name,
          icon: getRankedTierIcon(playerCheckData.data?.current?.tier.id),
        },
      } as Player;
    }),
  );

  return resolvedPlayers;
}
