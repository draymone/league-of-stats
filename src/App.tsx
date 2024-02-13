// Imports
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import Profile from './Profile/Profile';

function App() {
  const [username, setUsername] = useState('')

  return <>
    <InputForm setParentUsername={setUsername} />
    <Profile username={username} />
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
