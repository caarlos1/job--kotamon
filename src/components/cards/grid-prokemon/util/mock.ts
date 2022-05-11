import type { PokemonCardProps } from "../../pokemon-card/PokemonCard.vue";
import { pokemon } from "../../pokemon-card/util/mock";

export const pokemonList = (size = 12) => {
  const list: PokemonCardProps[] = [];
  for (let i = 1; i <= size; i++) {
    list.push({
      ...pokemon,
      name: `${pokemon.name} ${i}`,
    });
  }

  return list;
};
