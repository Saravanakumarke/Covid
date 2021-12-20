import "./App.css";
import Details from "./components/Details";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home}></Route>
        <Route path="/state" component={Details}></Route>
      </div>
    </Router>
  );
}

export default App;
