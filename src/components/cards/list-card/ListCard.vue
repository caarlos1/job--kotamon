<script lang="ts" setup>
export interface ListCard {
  title: string;
  list: string[];
}

withDefaults(defineProps<ListCard>(), {
  title: "",
});
</script>

<template>
  <div class="list__container">
    <span class="list__title">
      <h2 class="title">{{ title }}</h2>
    </span>
    <ul class="list__ul">
      <li v-for="item in list" :key="item" class="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped>
.list__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 15px;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1));
  align-items: center;
}

.list__title {
  padding: 20px;
  font-weight: 700;
  font-size: 2rem;
  color: #000;
}

.list__ul {
  width: 100%;
  font-family: "Mulish", sans-serif;
}

.list__ul .item {
  padding: 20px;
  border-top: 1px solid #f1f4f5;
  font-size: 1.5rem;
  color: #616161;
}
</style>
