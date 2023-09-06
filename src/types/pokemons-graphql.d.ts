type PokemonType = {
  type: {
    id: number;
    name: string;
  };
};

type PokemonData = {
  types: PokemonType[];
};

type Pokemons = {
  name: string;
  id: number;
  pokemon: PokemonData[];
};
