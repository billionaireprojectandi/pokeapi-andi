import request, { RequestDocument, gql } from "graphql-request";
const BASE_URL = "https://beta.pokeapi.co/graphql/v1beta";

type QueryParams = {
  offset: number;
  typeIds: number[];
};

export const getPokemonsQuery = ({ offset = 0, typeIds = [] }: QueryParams) => {
  const types = typeIds.length === 0 ? "" : `_in: [${typeIds.join(",")}]`;

  return gql`
		{
			pokemons: pokemon_v2_pokemonspecies(
				limit: 20
				offset: ${offset}
				order_by: { id: asc }
				where: {
					pokemon_v2_pokemons: {
						pokemon_v2_pokemontypes: { pokemon_v2_type: { id: {${types}} } }
					}
				}
			) {
				name
				id
				pokemon: pokemon_v2_pokemons {
					types: pokemon_v2_pokemontypes {
						type: pokemon_v2_type {
							id
							name
						}
					}
				}
			}
		}
	`;
};

export const getTypesQuery = () => {
  return gql`
    {
      types: pokemon_v2_type(offset: 0) {
        name
        id
      }
    }
  `;
};

export const getPokemonDetail = (name: string) => {
  return gql`
	{
		pokemonDetails: pokemon_v2_pokemonspecies(limit: 1, where: {name: {_eq: ${name}}}) {
			name
			id
			flavorText: pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}, limit: 1) {
				flavorText: flavor_text
			}
			pokemon: pokemon_v2_pokemons {
				name
				id
				stats: pokemon_v2_pokemonstats {
					baseStat: base_stat
					stat: pokemon_v2_stat {
						name
						statName: pokemon_v2_statnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}, limit: 1) {
							name
						}
					}
				}
				types: pokemon_v2_pokemontypes {
					type: pokemon_v2_type {
						id
						name
					}
				}
			}
		}
	}	
	`;
};

export const read = async <TResult>(param: {
  query: string;
}): Promise<TResult> => {
  return await request(BASE_URL, param.query as RequestDocument);
};
