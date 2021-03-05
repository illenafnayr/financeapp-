import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// import Header from './components/Header/Header.js'
import Show from './views/Show/Show.js'
import Home from './views/Home/Home.js'

function App() {
  return (

    <>
      <Router>
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/chart">
              <Show />
            </Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;
