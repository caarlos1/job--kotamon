<script lang="ts" setup>
import PokemonCard, {
  type PokemonCardProps,
} from "../pokemon-card/PokemonCard.vue";
import SpinnerUI from "../../ui/spinner/SpinnerUI.vue";

export interface PokemonGridProps {
  title?: string;
  list: PokemonCardProps[];
  loading?: boolean;
  actionCard?: (card: PokemonCardProps) => void;
}

withDefaults(defineProps<PokemonGridProps>(), {
  title: "",
  list: () => [],
  loading: false,
  actionCard: () => {
    return;
  },
});
</script>

<template>
  <div class="grid__container">
    <h2 v-if="title" class="grid__title">{{ title }}</h2>
    <div class="grid__body" v-show="list.length">
      <PokemonCard
        class="pokemon__card"
        v-for="item in list"
        :key="item.cod"
        v-bind="item"
        @card:click-card="actionCard"
      />
    </div>

    <div class="grid__footer">
      <SpinnerUI v-if="loading" :size="6" />

      <div v-else-if="list.length == 0" class="grid__empty">
        Nenhum pokemon encontrado...
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid__container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.grid__title {
  font-size: 1.8rem;
  font-weight: 700;
  padding-bottom: 30px;
}

.grid__body {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
  margin-bottom: 50px;
}

@supports (-webkit-touch-callout: none) {
  .grid__body {
    gap: 0;
  }
  .pokemon__card {
    margin-bottom: 30px;
  }
}

.grid__empty {
  font-weight: 500;
}

.grid__footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
</style>
