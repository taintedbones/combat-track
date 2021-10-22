import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/">
        <Dashboard />
      </Route>
      {/* Login doesn't have to be a separate page render, can just be modal */}
      <Route exact path="/login">
        <p>Login page/modal will go here</p>
      </Route>
    </Router>
  );
}

export default App;
