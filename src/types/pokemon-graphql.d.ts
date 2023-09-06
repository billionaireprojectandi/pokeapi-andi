type PokemonAbilityText = {
  id: number;
  shortEffect: string;
};

type PokemonAbility = {
  id: number;
  name: string;
  abilityText: PokemonAbilityText[];
};

type PokemonStat = {
  baseStat: number;
  stat: {
    name: string;
  };
};

type Pokemon = {
  name: string;
  id: number;
  stats: PokemonStat[];
  types: PokemonType[];
};

type FlavorText = {
  flavorText: string;
};

type PokemonDetail = {
  name: string;
  id: number;
  flavorText: FlavorText[];
  pokemon: Pokemon[];
};

type PokemonDetailsResponse = {
  pokemonDetails: PokemonDetail[];
};
