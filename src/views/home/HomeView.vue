<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import InputSearchUI from "../../components/ui/input-search/InputSearchUI.vue";
import PokemonGrid from "../../components/cards/grid-pokemon/PokemonGrid.vue";
import type { PokemonCardProps } from "@/components/cards/pokemon-card/PokemonCard.vue";

import { usePokemonStore } from "@/stores/pokemon";

const router = useRouter();
const pokemonStore = usePokemonStore();

const page = reactive({
  search: {
    placeholder: "Pesquise por nome ou código...",
  },
  grid: {
    title: "Pokemons",
  },
});

const toPokemonPage = (pokemon: PokemonCardProps) => {
  router.push({
    name: "pokemon",
    params: {
      id: pokemon.cod,
    },
  });
};

onMounted(async () => {
  try {
    pokemonStore.requestPokemons();
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div class="page__home">
    <InputSearchUI v-bind="page.search" />
    <PokemonGrid
      v-bind="page.grid"
      :list="pokemonStore.getPokemons"
      :action-card="toPokemonPage"
    />
    <div class="page__footer"></div>
  </div>
</template>

<style scoped>
.page__home {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  gap: 30px;
}

.page__footer {
  padding: 10px;
}
</style>
