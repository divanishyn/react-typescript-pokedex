import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type TParams = { name: string };

function PokemonDetails({ match }: RouteComponentProps<TParams>) {
  interface IAbilities {
    is_hidden: boolean;
    ability: {
      name: string;
    };
  }
  interface ITypes {
    type: {
      name: string;
    };
  }
  interface IStats {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  interface IEvolvesTo {
    species: {
      name: string;
      evolves_to: Array<IEvolvesTo>;
    };
  }
  interface IEvolution {
    chain: {
      evolves_to: Array<IEvolvesTo>;
    };
  }
  interface IPokemon {
    id: number;
    name: string;
    order: number;
    abilities: Array<IAbilities>;
    types: Array<ITypes>;
    stats: Array<IStats>;
    sprites: {
      front_default: string;
    };
  }
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [evolution, setEvolution] = useState<IEvolution>();

  const abilities = pokemon && pokemon.abilities.filter((item) => {return !item.is_hidden}).map((item) => {return item.ability.name});

  async function fetchData(name: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    res
      .json()
      .then(res => setPokemon(res))
      .catch(err => console.log(err));
  }

  async function fetchEvolutionData(pokemonId: number) {
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`);
    res
      .json()
      .then(res => setEvolution(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData(match.params.name);
  }, [match.params.name])

  useEffect(() => {
    if (pokemon && pokemon.id) {
      fetchEvolutionData(pokemon.id);
    }
  }, [pokemon])

// + picture
// + name
// + abilities
// + type
// + order-number
// + stats
// possible evolutions
// moves

  if (!pokemon) {
    return (<div></div>);
  }

  return (
      <div>
        <img alt="" src={pokemon.sprites.front_default} />

        <h1>#{pokemon.order} {pokemon.name}</h1>

        <h3>Abilities</h3>
        {abilities && abilities.map((ability) => {
          return <p>{ability}</p>
        })}

        <h3>Types</h3>
        {pokemon.types && pokemon.types.map((item) => {
          return <p>{item.type.name}</p>
        })}

        <h3>Stats</h3>
        {pokemon.stats && pokemon.stats.map((item) => {
          return <p>{item.stat.name}: {item.base_stat}/100</p>
        })}
    </div>
  );
}

export default PokemonDetails;