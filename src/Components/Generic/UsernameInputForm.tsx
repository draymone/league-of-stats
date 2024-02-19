// Imports
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState, useEffect } from 'react';
import { API_KEY } from '../../Config';
import { useLocation, useNavigate } from 'react-router-dom';

// Interfaces
interface AccountDTO {
  gameName: string,
  tagLine: string,
  puuid: string
}

function UsernameInputForm() {
  const [username, setUsername] = useState('')
  const [accountData, setAccountData] = useState<AccountDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

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
        // Redirect to the player's page
        navigate(`/user/${data.puuid}`);
      } catch (error) {
        setAccountData(null);
        setError((error as Error).message);
      }
    };

    if (username) {
      fetchAccountData();
    }
  }, [username, navigate]);

  const puuid: string | undefined = accountData?.puuid;

  return <main>
    <InputForm setParentUsername={setUsername} />
    {/*Error display*/}
    {error && <p>
      An error happened. Please ensure you entered a correct username and/or try again later.<br />
      Error code: {error}
    </p>}

    {/* Normal display */}
    {(username && !error && location.pathname=='/') && (
      <div>
        {accountData ? ( // Succes display
          <p>
            You should be redirected in a few seconds, if no, click <a href={`/user/${puuid}/`}>here</a>.
          </p>
        ) : ( // Loading display
          <p>Loading...</p>
        )}
      </div>
    )}

  </main>;
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

export default UsernameInputForm;
