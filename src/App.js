import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Combat from './views/Combat/Combat';
import Navbar from './components/Navbar/Navbar';
import EditActors from './views/EditActor/EditActors';
import EditScenarios from './views/EditScenarios/EditScenarios';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/combat-track/'>
        <Redirect to='/combat-track/combat' />
      </Route>
      <Route path='/combat-track/combat'>
        <Combat />
      </Route>
      <Route path='/combat-track/actors'>
        <EditActors />
      </Route>
      <Route path='/combat-track/scenarios'>
        <EditScenarios />
      </Route>
    </Router>
  );
}

export default App;
