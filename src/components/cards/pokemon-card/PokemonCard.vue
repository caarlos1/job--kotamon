<script lang="ts" setup>
import ImageBoxUI from "../../ui/image/ImageBoxUI.vue";

export interface PokemonCardProps {
  image: string;
  name: string;
  cod?: number;
  type: string;
}

withDefaults(defineProps<PokemonCardProps>(), {
  name: "",
});
</script>

<template>
  <div class="card__container">
    <div class="card__image">
      <img :src="image" :alt="name" />
    </div>
    <span class="card__name">
      <h3>{{ name }}</h3>
    </span>
    <span v-if="cod" class="card__cod">Cód. {{ cod }}</span>
    <span class="card__type">{{ type }}</span>
  </div>
</template>

<style scoped>
.card__container {
  width: 100%;
  max-width: 220px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  border-radius: 15px;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1));
  align-items: center;
}
.card__image img {
  width: 80px;
}

.card__name {
  font-size: 2.5rem;
  font-weight: 700;
  padding: 10px 20px;
}
.card__cod {
  font-size: 1.6rem;
  font-weight: 700;
  padding-bottom: 40px;
}

.card__type {
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 700;
  width: 100%;
  background: rgba(247, 247, 247, 0.4);
  border-radius: 8px;
  color: #c4c4c4;
}
</style>
