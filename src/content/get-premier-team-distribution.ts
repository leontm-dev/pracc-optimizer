import { Player } from "./get-player-data";

export type PremierTeam = {
  name: string;
  tag: string;
  id: string;
  players: string[];
  placement: {
    place: number;
    conference: string;
    division: string;
    points: number;
  };
  icon: string;
  stats: {
    wins: number;
    matches: number;
    losses: number;
    rounds_won: number;
    rounds_lost: number;
  };
  score: number;
};
function calculateTeamScore(given: string[], all: string[]): number {
  let score = 0;
  given.forEach((i) => {
    if (all.includes(i)) {
      score++;
    }
  });

  return score / all.length;
}
const divisions: Record<string, string> = {
  "1": "Open 1",
  "2": "Open 2",
  "3": "Open 3",
  "4": "Open 4",
  "5": "Open 5",
  "6": "Intermediate 1",
  "7": "Intermediate 2",
  "8": "Intermediate 3",
  "9": "Intermediate 4",
  "10": "Intermediate 5",
  "11": "Advanced 1",
  "12": "Advanced 2",
  "13": "Advanced 3",
  "14": "Advanced 4",
  "15": "Advanced 5",
  "16": "Elite 1",
  "17": "Elite 2",
  "18": "Elite 3",
  "19": "Elite 4",
  "20": "Elite 5",
  "21": "Contender",
  "22": "Invite",
};
function translateDivision(division: number): string | null {
  return divisions[division.toString()] ?? null;
}
export async function getPremierTeamDistribution(
  players: Player[],
  settings: {
    key: string | null;
    region: string | null;
    platform: string | null;
  },
): Promise<PremierTeam[]> {
  const teams: PremierTeam[] = [];
  if (
    settings.key == null ||
    settings.region == null ||
    settings.region === "" ||
    !settings ||
    !settings.platform
  )
    return [];

  const possiblePlayers = players.filter(
    (player) => player.possible && player.puuid && player.status === "found",
  );

  await Promise.all(
    possiblePlayers.map(async (player) => {
      if (!player.possible) return;
      const fittingTeamCheck = !!teams.find((team) =>
        team.players.map((p) => p).includes(player.puuid),
      );
      console.log(fittingTeamCheck);
      if (fittingTeamCheck) return;

      const matchesResponse = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/${settings.region}/${settings.platform}/${player.name}/${player.tag}?mode=premier&size=1`,
        {
          method: "GET",
          headers: {
            Authorization: settings.key || "",
          },
        },
      );
      console.log(matchesResponse);
      if (!matchesResponse.ok) return;

      const matchesData = (await matchesResponse.json()).data;
      console.log(matchesData);
      if (!matchesData) return;

      const lastMatch = matchesData[0];
      console.log(lastMatch);
      if (!lastMatch) return;

      const teamColor = lastMatch.players?.find(
        (p: any) => p?.puuid === player.puuid,
      )?.team_id;
      console.log(teamColor);
      if (!teamColor) return;

      const teamData:
        | {
            team_id: string;
            premier_roster: {
              id?: string;
              name?: string;
              tag?: string;
              members?: string[];
              customization?: {
                image?: string;
              };
            } | null;
          }
        | undefined = lastMatch.teams.find(
        (t: { team_id: string }) => t.team_id === teamColor,
      );
      console.log(teamData);
      if (!teamData || !teamData.premier_roster) return;

      const teamResponse = await fetch(
        `https://api.henrikdev.xyz/valorant/v1/premier/${teamData.premier_roster.name}/${teamData.premier_roster.tag}`,
        {
          method: "GET",
          headers: { Authorization: settings.key || "", Accept: "*/*" },
        },
      );
      console.log(teamResponse);
      if (!teamResponse.ok) return;

      const teamResponseData:
        | {
            id: string;
            name: string;
            tag: string;
            stats: {
              wins: number;
              matches: number;
              losses: number;
              rounds_won: number;
              rounds_lost: number;
            };
            placement: {
              points: number;
              conference: string;
              division: number;
              place: number;
            };
          }
        | undefined = (await teamResponse.json()).data;
      console.log(teamResponseData);
      if (!teamResponseData) return;

      teams.push({
        icon: teamData.premier_roster.customization?.image || "",
        id: teamData.premier_roster.id || "",
        name: teamData.premier_roster.name || "",
        tag: teamData.premier_roster.tag || "",
        placement: {
          points: teamResponseData.placement.points,
          division:
            translateDivision(teamResponseData.placement.division) || "",
          conference: teamResponseData.placement.conference,
          place: teamResponseData.placement.place,
        },
        stats: teamResponseData.stats,
        players: teamData.premier_roster.members || [],
        score: calculateTeamScore(
          teamData.premier_roster.members ?? [],
          players
            .map((p) => {
              if (p.possible) return p.puuid;

              return undefined;
            })
            .filter((p) => p !== undefined),
        ),
      });
    }),
  );

  const cleanedTeams = [...new Set(teams.map((t) => t.id))]
    .map((t) => teams.find((team) => team.id === t))
    .filter((t) => t !== undefined);
  return cleanedTeams.sort((a, b) => b.score - a.score);
}
