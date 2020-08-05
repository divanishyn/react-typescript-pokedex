import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <CssBaseline />
      <div className="app">
        <Router>
          <Route path="/" exact component={PokemonList} />
          <Route path="/details/:name" component={PokemonDetails} />
        </Router>
      </div>
    </>
  );
}

export default App;
