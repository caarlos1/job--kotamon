import type { PokemonCardProps } from "@/components/cards/pokemon-card/PokemonCard.vue";
import type { PokeAbility, PokeInfo } from "@/services/types";
import type { AbilityPerPokemon } from "@/stores/pokemon";

export const pokemonCardAdapter = (
  pokeInfos: PokeInfo[],
  click = false
): PokemonCardProps[] => {
  const pokeCards: PokemonCardProps[] = [];

  pokeInfos.forEach((info) =>
    pokeCards.push({
      cod: info.id,
      name: info.name,
      image: info.sprites.front_default,
      type: info.types[0].type.name,
      abilities: info.abilities.map((a) => a.ability.url),
      click,
    })
  );

  return pokeCards;
};

export const abilityPerPokemonAdapter = (
  pokeId: number,
  pokeAbility: PokeAbility[]
): AbilityPerPokemon => {
  const shortEffects: string[] = [];

  pokeAbility.forEach((a) => {
    shortEffects.push(a.effect_entries[0].short_effect);
  });

  return {
    id: pokeId,
    abilities: shortEffects,
  };
};
