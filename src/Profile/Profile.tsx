import { useState, useEffect } from 'react';
import { API_KEY } from '../Config';
import RecentMatches from '../Match/MatchOverview';

// Interfaces
interface SummonerData {
  accountId: string,
  profileIconId: number,
  revisionDate: number,
  name: string,
  id: string,
  puuid: string,
  summonerLevel: number
}

/**
 * Shows profile-related informations
 * 
 * @param {string} puuid - account's puuid
 * @returns
 */
function Profile({ puuid }: ProfileProps) {
  return (
    <div>
      <h2>Summoner Information</h2>
      {(puuid) && (
        <div>
          {
            <>
              <SummonerInformations puuid={puuid} />
              <RecentMatches puuid={puuid} />
            </>
          }
        </div>
      )}

    </div>
  );
}
interface ProfileProps {
  puuid: string | undefined
}


/**
 * Profile's informations
 * 
 * @param {string} puuid - the account's puuid
 * @returns display of the player's icon, level and username
 */
function SummonerInformations({ puuid }: AccountInformationsProps) {
  const [summonerData, setSummonerData] = useState<SummonerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch summoner information. Response code: ${response.status}`);
        }
        const data = await response.json();
        setSummonerData(data);
        setError(null);
      } catch (error) {
        setSummonerData(null);
        setError((error as Error).message);
      }
    };

    if (puuid) {
      fetchSummonerData();
    }
  }, [puuid]);

  return (
    <div>
      {/*Error display*/}
      {error && <p>
        An error happened. Please try again later.<br />
        Error code: {error}
      </p>}

      {/* Normal display */}
      {(puuid && !error) && (
        <div>
          {summonerData ? ( // Succes display
            <>
              <img width={100} src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${summonerData.profileIconId}.png`} />
              {summonerData.name} <br />
              Level: {summonerData.summonerLevel} <br />
            </>
          ) : ( // Loading display
            <p>Loading...</p>
          )}
        </div>
      )}

    </div>
  );
}
interface AccountInformationsProps {
  puuid: string | undefined
}

export default Profile;