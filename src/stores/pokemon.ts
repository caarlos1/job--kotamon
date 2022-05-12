import type { PokemonCardProps } from "@/components/cards/pokemon-card/PokemonCard.vue";
import { pokeAPI } from "@/services";
import type { PokeInfo } from "@/services/types";
import {
  abilityPerPokemonAdapter,
  pokemonCardAdapter,
} from "@/util/adapters/pokemon";
import { defineStore } from "pinia";

export interface AbilityPerPokemon {
  id: number;
  abilities: string[];
}

export const usePokemonStore = defineStore({
  id: "pokemon",
  state: () => ({
    pokemons: [] as PokemonCardProps[],
    isolatedPokemons: [] as PokemonCardProps[],
    searchItems: [] as PokemonCardProps[],
    abilities: [] as AbilityPerPokemon[],
    page: 0,
    search: false,
    firstRequest: true,
  }),

  getters: {
    getPokemons: (state) => (state.search ? state.searchItems : state.pokemons),
    getSearch: (state) => state.searchItems,
    getPokemon: (state) => {
      return {
        abilities: (idPokemon: number) => {
          const pokeAbilities = state.abilities.find((a) => a.id == idPokemon);
          if (pokeAbilities) return pokeAbilities.abilities;
          else return [];
        },
        byId: (pokeId: number) => {
          let pokemon = state.isolatedPokemons.find((p) => p.cod == pokeId);
          if (!pokemon) pokemon = state.pokemons.find((p) => p.cod == pokeId);

          if (pokemon) return [pokemon];
          return [];
        },
      };
    },
  },

  actions: {
    async requestPokemons(search = "", manual = false) {
      if (search) this.search = true;
      else this.search = false;

      if (manual || this.firstRequest || this.pokemons.length == 0 || search) {
        this.firstRequest = false;

        try {
          const pokeReq: PokeInfo[] = [];

          if (search) {
            try {
              this.searchItems = pokemonCardAdapter(
                [await pokeAPI.about(search)],
                true
              );
            } catch (err) {
              this.searchItems = [];
            }
          } else {
            this.page++;
            pokeReq.push(...(await pokeAPI.get(this.page)));
          }

          this.pokemons.push(...pokemonCardAdapter(pokeReq, true));
        } catch (err) {
          console.log(err);
        }
      }
    },

    async requestPokemonAbilities(pokeId: number) {
      const pokeAbilities = this.abilities.find((a) => a.id == pokeId);
      if (pokeAbilities) return;

      let pokemon = this.isolatedPokemons.find((poke) => poke.cod == pokeId);
      if (!pokemon) pokemon = this.pokemons.find((poke) => poke.cod == pokeId);

      if (pokemon) {
        this.abilities.push(
          abilityPerPokemonAdapter(
            pokeId,
            await pokeAPI.getPokeAbility(pokemon.abilities || [])
          )
        );
        return;
      }

      const pokemonCard: PokemonCardProps[] = pokemonCardAdapter([
        await pokeAPI.about(pokeId),
      ]);

      this.isolatedPokemons.push(pokemonCard[0]);
      this.abilities.push(
        abilityPerPokemonAdapter(
          pokeId,
          await pokeAPI.getPokeAbility(pokemonCard[0].abilities || [])
        )
      );
    },
  },
});
