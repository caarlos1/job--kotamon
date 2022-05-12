<script lang="ts" setup>
import PokemonCard, {
  type PokemonCardProps,
} from "../pokemon-card/PokemonCard.vue";

export interface PokemonGridProps {
  title?: string;
  list: PokemonCardProps[];
  actionCard?: (card: PokemonCardProps) => void;
}

withDefaults(defineProps<PokemonGridProps>(), {
  title: "",
  list: () => [],
  actionCard: () => {
    return;
  },
});
</script>

<template>
  <div class="grid__container">
    <h2 v-if="title" class="grid__title">{{ title }}</h2>
    <div class="grid__body">
      <PokemonCard
        v-for="item in list"
        :key="item.cod"
        v-bind="item"
        @card:click-card="actionCard"
      />
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
  justify-content: space-between;
  gap: 30px;
}
</style>
