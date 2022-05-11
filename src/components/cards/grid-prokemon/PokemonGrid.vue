<script lang="ts" setup>
import PokemonCard, {
  type PokemonCardProps,
} from "../pokemon-card/PokemonCard.vue";

export interface PokemonGridProps {
  list: PokemonCardProps[];
}

withDefaults(defineProps<PokemonGridProps>(), {
  list: () => [],
});
</script>

<template>
  <div class="grid__container">
    <PokemonCard v-for="item in list" :key="item.cod" v-bind="item" />
  </div>
</template>

<style scoped>
.grid__container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 15px;
}
</style>
