// Imports
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import Profile from './Profile/Profile';

function App() {
  const [username, setUsername] = useState('')

  return <>
    <InputForm setParentUsername={setUsername}/>
    <Profile username={username}/>
  </>;
}

function InputForm({setParentUsername}: InputFormProps) {

  const [username, setUsername] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParentUsername(username)
    console.log("wooo")
  };

  return <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  </div>;
}
interface InputFormProps{
  setParentUsername: Dispatch<SetStateAction<string>>;
}

export default App;
