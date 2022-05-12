<script lang="ts" setup>
import { watch, onMounted, onUnmounted, reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import InputSearchUI from "../../components/ui/input-search/InputSearchUI.vue";
import PokemonGrid from "../../components/cards/grid-pokemon/PokemonGrid.vue";
import type { PokemonCardProps } from "@/components/cards/pokemon-card/PokemonCard.vue";

import { usePokemonStore } from "@/stores/pokemon";
import { useGlobalEvents } from "@/hooks/useGlobalEvents";

const router = useRouter();
const route = useRoute();
const pokemonStore = usePokemonStore();
const globalEvents = useGlobalEvents();

const page = reactive({
  search: {
    placeholder: "Pesquise por nome ou código...",
  },
  requesting: {
    pokemon: false,
  },
});

const pokemons = reactive({
  title: "Pokemons",
  loading: false,
  emptyButton: "Ver todos os pokemons!",
});

const footer = ref(null);

const emptyText = computed(() => {
  return `Nenhum pokemon com cod/name "${route.query.search}" encontrado.`;
});

onMounted(async () => {
  globalEvents.listen("template:scroll", handleInfiniteScroll);
  await requestData();
});

onUnmounted(() => {
  globalEvents.off("template:scroll", handleInfiniteScroll);
});

const handleInfiniteScroll = () => {
  if (page.requesting.pokemon) return;
  const footerPos = (
    footer.value as unknown as HTMLElement
  ).getBoundingClientRect();

  if (footerPos.bottom <= window.innerHeight) requestData(true);
};

watch(
  () => route.query,
  async () => {
    if (route.name == "home") requestData();
  }
);

const requestData = async (manual = false) => {
  if (page.requesting.pokemon) return;

  pokemons.loading = true;

  try {
    let search = "";
    if (route.query && route.query.search)
      search = route.query.search as string;

    await pokemonStore.requestPokemons(search, manual);
  } catch (err) {
    console.log(err);
  }
  pokemons.loading = false;
  page.requesting.pokemon = false;
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

const toHome = () => {
  router.push({
    name: "home",
  });
};
</script>

<template>
  <div class="page__home">
    <InputSearchUI v-bind="page.search" @input-search:submit="searchPokemon" />
    <PokemonGrid
      v-bind="pokemons"
      :list="pokemonStore.getPokemons"
      :action-card="toPokemonPage"
      :empty-text="emptyText"
      :empty-button-action="toHome"
    />
    <div ref="footer" class="page__footer"></div>
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
