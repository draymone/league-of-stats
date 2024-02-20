import { useState, useEffect } from 'react';
import { API_KEY } from '../../Config';
import { formationDuration, shortenString } from '../../Util';

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
                        {recentMatches.map((elem, index) =>
                            <MatchOverview matchId={elem} puuid={puuid} key={index} />
                        )}
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
 * @param {string} puuid: the player's puuid
 * @returns 
 */
function MatchOverview({ matchId, puuid }: MatchOverviewProps) {
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

    const index: number | undefined = match?.metadata.participants.indexOf(puuid); // The index of the player in the match's participants list
    const player: ParticipantDto | undefined = match?.info.participants[index ? index : 0] // If the puuid isn't present in this game, use the first player

    return <>
        {/*Error display*/}
        {error && <p>
            An error happened. Please try again later.<br />
            Error code: {error}
        </p>}

        {/* Normal display */}
        {(matchId && !error) && (
            <>
                {(match && player) ? ( // Succes display
                    <div className='matchOverview'
                        style={{ backgroundColor: player.win ? '#5dec4d' : '#e76464' }}> {/* Apply a background color depending on the win */}
                        {/* Champion and game duration */}
                        <div className='matchOverviewChampion'>
                            <img className='matchOverviewChampionIcon' src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${player.championName}.png`} alt={player.championName} />
                            <span className='matchOverviewDuration'>{formationDuration(match.info.gameDuration)}</span>
                        </div>

                        {/* KDA */}
                        <div className='matchOverviewKda'>
                            <span className='matchOverviewKdaKills'>{player.kills}</span>
                            /
                            <span className='matchOverviewKdaDeaths'>{player.deaths}</span>
                            /
                            <span className='matchOverviewKdaAssists'>{player.assists}</span>
                        </div>

                        {/* Items & Keystone*/}
                        <div className='matchOverviewItems'>
                            <img className='matchOverviewItem' src={player.item0 ? `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${player.item0}.png` : '../assets/empty_item.png'} />
                            <img className='matchOverviewItem' src={player.item1 ? `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${player.item1}.png` : '../assets/empty_item.png'} />
                            <img className='matchOverviewItem' src={player.item2 ? `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${player.item2}.png` : '../assets/empty_item.png'} />
                            <img className='matchOverviewItem' src={player.item6 ? `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${player.item6}.png` : '../assets/empty_item.png'} />
                            <img className='matchOverviewItem' src={player.item3 ? `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${player.item3}.png` : '../assets/empty_item.png'} />
                            <img className='matchOverviewItem' src={player.item4 ? `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${player.item4}.png` : '../assets/empty_item.png'} />
                            <img className='matchOverviewItem' src={player.item5 ? `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/${player.item5}.png` : '../assets/empty_item.png'} />
                            <img className='matchOverviewItem' src='../assets/empty_item.png' /> {/* TODO: get the rune keystone */}
                        </div>

                        {/* Players list */}
                        <div className='matchOverviewParticipants'>
                            {match.info.participants.map(
                                (participant, index) => <div className='matchOverviewParticipant' key={index}>
                                    <img className='matchOverviewParticipantChampion' src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${participant.championName}.png`} />
                                    <a style={{ color: (participant.puuid == player.puuid) ? '#1004f3' : '#202020' }}
                                        href={participant.puuid}>
                                        {shortenString(participant.summonerName, 12)}
                                    </a>
                                </div>
                            )}
                        </div>

                    </div>
                ) : ( // Loading display
                    <p>Loading...</p>
                )}
            </>
        )}
    </>;
}
interface MatchOverviewProps {
    matchId: string,
    puuid: string
}

export default RecentMatches;