<script lang="ts" setup>
export interface PokemonCardProps {
  image: string;
  name: string;
  cod?: number;
  type: string;
  click?: boolean;
  abilities?: string[];
  disableClick?: boolean;
}

const props = withDefaults(defineProps<PokemonCardProps>(), {
  name: "",
  click: false,
  disableClick: false,
});

const emit = defineEmits(["card:click-card"]);

const clickEvent = () => {
  if (props.click && !props.disableClick) emit("card:click-card", props);
};
</script>

<template>
  <div
    class="card__container"
    :class="{ clickable: click && !disableClick }"
    @click="clickEvent"
  >
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
  min-width: 120px;
  max-width: 140px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  border-radius: 15px;
  filter: drop-shadow(0px 5px 5px #e1e1e1);
  align-items: center;
  transition: all 0.2s ease;
  text-align: center;
}

@supports (-webkit-touch-callout: none) {
  .card__container {
    filter: none;
    border: 1px solid #dee4edca;
    gap: 0;
  }
}

.clickable {
  cursor: pointer;
}

@media (min-width: 600px) {
  .clickable:hover {
    transform: scale(110%);
  }

  .clickable:active {
    transform: scale(105%);
  }
}

.card__image img {
  width: 80px;
}

.card__name {
  font-size: 1.8rem;
  font-weight: 700;
  padding: 10px 20px 0px;
}

.card__cod {
  font-size: 1.2rem;
  font-weight: 700;
  padding-bottom: 20px;
}

.card__type {
  text-align: center;
  font-size: 1.2rem;
  line-height: 2.2rem;
  font-weight: 700;
  width: 100%;
  background: rgba(247, 247, 247, 0.4);
  border-radius: 8px;
  color: #c4c4c4;
}

@media (max-width: 380px) {
  .card__container {
    min-width: 100%;
  }
}
</style>
