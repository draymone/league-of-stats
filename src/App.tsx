// Imports
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile';
import UsernameInputForm from './Components/Generic/UsernameInputForm';


function App() {
  return <div>
    <UsernameInputForm />
    <Routes>
      <Route path='/user/:puuid' element={<Profile />} />
    </Routes>
  </div>
}
export default App;
