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
    abilities: [] as AbilityPerPokemon[],
    page: 0,
    search: "",
    firstRequest: true,
  }),

  getters: {
    getPokemons: (state) => state.pokemons,
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
      if (manual || this.firstRequest) {
        this.firstRequest = false;

        if (search && this.search != search) this.firstRequest = true;
        else {
          if (this.search) this.firstRequest = true;
        }

        try {
          const pokeReq: PokeInfo[] = [];

          if (search) {
            if (this.search != search) {
              this.page = 0;
              this.pokemons = [];
              this.search = search;
            }

            this.page++;
            // pokeReq.push(
            //   ...(await pokeAPI.search(search, this.page)).results
            // );
          } else {
            if (this.search) {
              this.page = 0;
              this.pokemons = [];
              this.search = "";
            }

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
