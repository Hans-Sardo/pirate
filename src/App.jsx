import logo from './logo.svg';
import './App.css';

import {Routes, Route} from 'react-router-dom'
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';



function App() {
  return (
    <fieldset>
    <legend>App.jsx</legend>
    <Routes>
      <Route path="/pirates" element={<Dashboard />} />
      <Route path="/pirates/new" element={<Create />} />
      <Route path="/pirates/:pirate_id" element={<Details/>}/>
    </Routes>
    </fieldset>
    
  );
}

export default App;
