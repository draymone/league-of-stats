import { useState, useEffect } from 'react';
import { API_KEY } from '../Config';

// Interfaces
interface MatchDto {
    metadata: MetadataDto,
    info: InfoDto
}
interface MetadataDto {
    dataVersion: string,
    matchId: string,
    participants: string[]
}
interface InfoDto {
    gameCreation: number,
    gameDuration: number,
    gameEndTimestamp: number,
    gameId: number,
    gameMode: string,
    gameName: string,
    gameStartTimestamp: number,
    gameType: string,
    gameVersion: string,
    mapId: number,
    participants: ParticipantDto[],
    platformId: string,
    queueId: number,
    teams: TeamDto[],
    tournamentCode: string
}
interface ParticipantDto {
    assists: number,
    baronKills: number,
    bountyLevel: number,
    champExperience: number,
    champLevel: number,
    championId: number,
    championName: string,
    championTransform: number,
    consumablesPurchased: number,
    damageDealtToBuildings: number,
    damageDealtToObjectives: number,
    damageDealtToTurrets: number,
    damageSelfMitigated: number,
    deaths: number,
    detectorWardsPlaced: number,
    doubleKills: number,
    dragonKills: number,
    firstBloodAssist: boolean,
    firstBloodKill: boolean,
    firstTowerAssist: boolean,
    firstTowerKill: boolean,
    gameEndedInEarlySurrender: boolean,
    gameEndedInSurrender: boolean,
    goldEarned: number,
    goldSpent: number,
    individualPosition: string,
    inhibitorKills: number,
    inhibitorTakedowns: number,
    inhibitorsLost: number,
    item0: number,
    item1: number,
    item2: number,
    item3: number,
    item4: number,
    item5: number,
    item6: number,
    itemsPurchased: number,
    killingSprees: number,
    kills: number,
    lane: string,
    largestCriticalStrike: number,
    largestKillingSpree: number,
    largestMultiKill: number,
    longestTimeSpentLiving: number,
    magicDamageDealt: number,
    magicDamageDealtToChampions: number,
    magicDamageTaken: number,
    neutralMinionsKilled: number,
    nexusKills: number,
    nexusTakedowns: number,
    nexusLost: number,
    objectivesStolen: number,
    objectivesStolenAssists: number,
    participantId: number,
    pentaKills: number,
    perks: PerksDto,
    physicalDamageDealt: number,
    physicalDamageDealtToChampions: number,
    physicalDamageTaken: number,
    profileIcon: number,
    puuid: string,
    quadraKills: number,
    riotIdName: string,
    riotIdTagline: string,
    role: string,
    sightWardsBoughtInGame: number,
    spell1Casts: number,
    spell2Casts: number,
    spell3Casts: number,
    spell4Casts: number,
    summoner1Casts: number,
    summoner1Id: number,
    summoner2Casts: number,
    summoner2Id: number,
    summonerId: string,
    summonerLevel: number,
    summonerName: string,
    teamEarlySurrendered: boolean,
    teamId: number,
    teamPosition: string,
    timeCCingOthers: number,
    timePlayed: number,
    totalDamageDealt: number,
    totalDamageDealtToChampions: number,
    totalDamageShieldedOnTeammates: number,
    totalDamageTaken: number,
    totalHeal: number,
    totalHealsOnTeammates: number,
    totalMinionsKilled: number,
    totalTimeCCDealt: number,
    totalTimeSpentDead: number,
    totalUnitsHealed: number,
    tripleKills: number,
    trueDamageDealt: number,
    trueDamageDealtToChampions: number,
    trueDamageTaken: number,
    turretKills: number,
    turretTakedowns: number,
    turretsLost: number,
    unrealKills: number,
    visionScore: number,
    visionWardsBoughtInGame: number,
    wardsKilled: number,
    wardsPlaced: number,
    win: boolean
}
interface PerksDto {
    statPerks: PerkStatsDto,
    styles: PerkStyleDto[]
}
interface PerkStatsDto {
    defense: number,
    flex: number,
    offense: number
}
interface PerkStyleDto {
    description: string,
    selections: PerkStyleSelectionDto[],
    style: number
}
interface PerkStyleSelectionDto {
    perk: number,
    var1: number,
    var2: number,
    var3: number
}
interface TeamDto {
    bans: BanDto[],
    objectives: ObjectivesDto,
    teamId: number,
    win: boolean
}
interface BanDto {
    championId: number,
    pickTurn: number
}
interface ObjectivesDto {
    baron: ObjectiveDto,
    champion: ObjectiveDto,
    dragon: ObjectiveDto,
    inhibitor: ObjectiveDto,
    riftHerald: ObjectiveDto,
    tower: ObjectiveDto
}
interface ObjectiveDto {
    first: boolean,
    kills: number
}

function RecentMatches({ puuid }: RecentMatchesProps) {
    const [recentMatches, setRecentMatches] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // When a puuid is provided, fetch the 10 most recent matches
    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch latest matches. Response code: ${response.status}`);
                }
                const data = await response.json();
                setRecentMatches(data);
                setError(null);
            } catch (error) {
                setRecentMatches(null);
                setError((error as Error).message);
            }
        };

        if (puuid) {
            fetchAccountData();
        }
    }, [puuid]);

    return <div>
        {/*Error display*/}
        {error && <p>
            An error happened. Please try again later.<br />
            Error code: {error}
        </p>}

        {/* Normal display */}
        {(puuid && !error) && (
            <div>
                {recentMatches ? ( // Succes display
                    <>
                        {recentMatches.map((elem, index) => (
                            <MatchOverview matchId={elem} key={index} />
                        ))}
                    </>
                ) : ( // Loading display
                    <p>Loading...</p>
                )}
            </div>
        )}

    </div>;
}
interface RecentMatchesProps {
    puuid: string
}

/** Display's global information about a match
 * 
 * @param {string} matchId: the match's id 
 * @returns 
 */
function MatchOverview({ matchId }: MatchOverviewProps) {
    const [match, setMatch] = useState<MatchDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    // When a match id is provided, fetch it's data
    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch match information. Response code: ${response.status}`);
                }
                const data = await response.json();
                setMatch(data);
                setError(null);
            } catch (error) {
                setMatch(null);
                setError((error as Error).message);
            }
        };

        if (matchId) {
            fetchAccountData();
        }
    }, [matchId]);

    return <div>
        {/*Error display*/}
        {error && <p>
            An error happened. Please try again later.<br />
            Error code: {error}
        </p>}

        {/* Normal display */}
        {(matchId && !error) && (
            <div>
                {match ? ( // Succes display
                    <>
                        {/* TODO: Display things here */}
                    </>
                ) : ( // Loading display
                    <p>Loading...</p>
                )}
            </div>
        )}
    </div>;
}
interface MatchOverviewProps {
    matchId: string
}

export default RecentMatches;