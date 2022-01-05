import { HashRouter, Routes, Route } from 'react-router-dom';
import Combat from './views/Combat/Combat';
import Navbar from './components/Navbar/Navbar';
import HomePage from './views/HomePage';
import EditActors from './views/EditActor/EditActors';
import EditScenarios from './views/EditScenarios/EditScenarios';

function App() {
  return (
    <HashRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/combat" element={<Combat />} />
        <Route path="/actors" element={<EditActors />} />
        <Route path="/scenarios" element={<EditScenarios />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
