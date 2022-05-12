<script lang="ts" setup>
import { usePokemonStore } from "@/stores/pokemon";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import ListCard from "../../components/cards/list-card/ListCard.vue";
import PokemonCard from "../../components/cards/pokemon-card/PokemonCard.vue";

const router = useRouter();
const route = useRoute();
const pokemonStore = usePokemonStore();

const abilities = reactive({
  title: "Habilidades",
  list: [],
});

const pokeId = ref(parseInt(route.params.id as string));

onMounted(async () => {
  if (pokeId.value) await pokemonStore.requestPokemonAbilities(pokeId.value);
});

const getPoke = (id: number) => pokemonStore.getPokemon.byId(id)[0];
const getAbilities = (id: number) => pokemonStore.getPokemon.abilities(id);

const toHome = () => {
  router.push({
    name: "home",
  });
};
</script>

<template>
  <div class="page__pokemon">
    <div class="pokemon__info" v-if="getPoke(pokeId) && getAbilities(pokeId)">
      <PokemonCard
        class="pokemon__card"
        v-if="getPoke(pokeId)"
        v-bind="getPoke(pokeId)"
        disable-click
      />
      <ListCard v-bind="abilities" :list="getAbilities(pokeId)" />
    </div>

    <div class="page__footer">
      <a href="#" class="footer__back" @click.prevent="toHome">Voltar</a>
    </div>
  </div>
</template>

<style scoped>
.page__pokemon {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  gap: 30px;
}

.pokemon__info {
  display: flex;
  align-items: flex-start;
  gap: 30px;
}

@supports (-webkit-touch-callout: none) {
  .page__pokemon,
  .pokemon__info {
    gap: 0;
  }

  .pokemon__card,
  .pokemon__info {
    margin-bottom: 30px;
  }
}

@media (max-width: 380px) {
  .pokemon__info {
    flex-direction: column;
  }
}

.page__footer {
  width: 100%;
  text-align: center;
}

.footer__back {
  font-weight: 700;
}
</style>
