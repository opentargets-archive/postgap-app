import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import DiseasePage from './pages/DiseasePage';
import GenePage from './pages/GenePage';
import LocusPage from './pages/LocusPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/disease/:efoId" component={DiseasePage} />
          <Route path="/gene/:geneId" component={GenePage} />
          <Route path="/locus" component={LocusPage} />
        </div>
      </Router>
    );
  }
}

export default App;
