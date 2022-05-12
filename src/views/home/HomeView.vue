<script lang="ts" setup>
import { watch, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

import InputSearchUI from "../../components/ui/input-search/InputSearchUI.vue";
import PokemonGrid from "../../components/cards/grid-pokemon/PokemonGrid.vue";
import type { PokemonCardProps } from "@/components/cards/pokemon-card/PokemonCard.vue";

import { usePokemonStore } from "@/stores/pokemon";

const router = useRouter();
const route = useRoute();
const pokemonStore = usePokemonStore();

const page = reactive({
  search: {
    placeholder: "Pesquise por nome ou código...",
  },
  grid: {
    title: "Pokemons",
  },
  loading: true,
});

const requestData = async (manual = false) => {
  page.loading = true;
  try {
    let search = "";
    if (route.query && route.query.search)
      search = route.query.search as string;

    pokemonStore.requestPokemons(search, manual);
  } catch (err) {
    console.log(err);
  }
  page.loading = false;
};

const toPokemonPage = (pokemon: PokemonCardProps) => {
  router.push({
    name: "pokemon",
    params: {
      id: pokemon.cod,
    },
  });
};

const searchPokemon = (search = "") => {
  router.push({
    name: "home",
    query: {
      search,
    },
  });
};

onMounted(async () => {
  await requestData();
});

watch(
  () => route.query,
  async () => {
    requestData();
  }
);
</script>

<template>
  <div class="page__home">
    <InputSearchUI v-bind="page.search" @input-search:submit="searchPokemon" />
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
