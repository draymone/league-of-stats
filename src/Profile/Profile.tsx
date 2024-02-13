import { useState, useEffect } from 'react';
import { API_KEY } from '../Config';

// Objects
interface AccountData {
  gameName: string,
  tagLine: string,
  puuid: string
}

function Profile({ username }: ProfileProps) {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const splittedUsername = username.split("#")
        const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${splittedUsername[0]}/${splittedUsername[1]}?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch summoner information. Response code: ${response.status}`);
        }
        const data = await response.json();
        setAccountData(data);
        setError(null);
      } catch (error) {
        setAccountData(null);
        setError((error as Error).message);
      }
    };

    if (username) {
      fetchSummonerData();
    }
  }, [username]);

  const puuid: string | undefined = accountData?.puuid;

  return (
    <div>
      <h2>Summoner Information</h2>

      {/*Error display*/}
      {error && <p>
        An error happened. Please ensure you entered a correct username and/or try again later.<br />
        Error code: {error}
      </p>}

      {/* Normal display */}
      {(username && !error) && (
        <div>
          {accountData ? ( // Succes display
            <>
              <SummonerInformations puuid={puuid} />
            </>
          ) : ( // Loading display
            <p>Loading...</p>
          )}
        </div>
      )}

    </div>
  );
}
interface ProfileProps {
  username: string
}


/**
 * Profile's informations
 * 
 * @param {string} puuid - the account's puuid
 * @returns 
 */
function SummonerInformations({ puuid }: AccountInformationsProps) {
  if (!puuid) {
    return <>
      Holé muchacho</>
  }

  return <div>
    <p>pUUID: {puuid}</p>
  </div>
}
interface AccountInformationsProps {
  puuid: string | undefined
}

export default Profile;