import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <>
      <CssBaseline />
      <div className="app">
        <PokemonList />
      </div>
    </>
  );
}

export default App;
