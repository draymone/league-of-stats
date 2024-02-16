// Imports
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState, useEffect } from 'react';
import Profile from './Profile/Profile';
import { API_KEY } from './Config';

// Interfaces
interface AccountData {
  gameName: string,
  tagLine: string,
  puuid: string
}

function App() {
  const [username, setUsername] = useState('')
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // When the username changes, fetch it's puuid
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const splittedUsername = username.split("#")
        const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${splittedUsername[0]}/${splittedUsername[1]}?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch account information. Response code: ${response.status}`);
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
      fetchAccountData();
    }
  }, [username]);

  const puuid: string | undefined = accountData?.puuid;

  return <>
    <InputForm setParentUsername={setUsername} />
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
            <Profile puuid={puuid} />
          </>
        ) : ( // Loading display
          <p>Loading...</p>
        )}
      </div>
    )}

  </>;
}

/**
 * 
 * A form that prompts the user for his username
 * @param {Dispatch<SetStateAction<string>>} setParentUsername - use state for setting the username
 *
 */
function InputForm({ setParentUsername }: InputFormProps) {

  const [username, setUsername] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParentUsername(username)
  };

  return <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="player#123"
        value={username}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  </div>;
}
interface InputFormProps {
  setParentUsername: Dispatch<SetStateAction<string>>;
}

export default App;
