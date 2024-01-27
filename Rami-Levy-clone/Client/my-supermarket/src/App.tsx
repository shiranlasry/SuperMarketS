import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/NavBar';
import Home from './pages/Home/Home';
// Import other components as needed

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* <Route path="/history" component={History} /> */}
        {/* <Route path="/feed" component={Feed} /> */}
        <Route path="/" exact>
          <Home />
        </Route>
        Add more routes for other components
      </Switch>
    </Router>
  );
};

export default App;
