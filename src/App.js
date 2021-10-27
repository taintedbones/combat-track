import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Combat from './views/Combat/Combat';
import Navbar from './components/Navbar/Navbar';
import EditActors from './views/EditActor/EditActors';
import EditScenarios from './views/EditScenarios/EditScenarios';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path='/'>
        <Redirect to='/combat' />
      </Route>
      <Route exact path='/combat'>
        <Combat />
      </Route>
      <Route exact path='/actors'>
        <EditActors />
      </Route>
      <Route exact path='/scenarios'>
        <EditScenarios />
      </Route>
    </Router>
  );
}

export default App;
