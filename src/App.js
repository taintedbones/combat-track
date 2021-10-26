import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Combat from "./views/Combat/Combat";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/">
        <Redirect to="/combat" />
      </Route>
      <Route exact path="/combat">
        <Combat />
      </Route>
    </Router>
  );
}

export default App;
