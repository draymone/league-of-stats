// Imports
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile';
import UsernameInputForm from './Components/Generic/UsernameInputForm';
import Match from './Pages/Match';


function App() {
  return <div>
    <UsernameInputForm />
    <Routes>
      <Route path='/' element={<p>Welcome</p>} />
      <Route path='/user/:puuid' element={<Profile />} />
      <Route path='/match/:matchId' element={<Match />} />
    </Routes>
  </div>
}
export default App;
