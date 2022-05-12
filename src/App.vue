<script setup lang="ts">
import { reactive } from "vue";
import { RouterView } from "vue-router";

import DefaultTemplate from "./template/default/DefaultTemplate.vue";
import TheMenu from "./components/header/menu/TheMenu.vue";

import "./assets/reset.css";
import "./assets/root.css";

const page = reactive({
  menu: {
    logo: {
      title: "Kotas PokSearch",
      logoImage: "https://www.kotas.com.br/img/kotas_logo.bcbea222.svg",
      uppercase: true,
      url: "home",
    },
    userImage:
      "https://gravatar.com/avatar/9a82ba52769cbc22951a7cf516124307?s=250",
  },
});
</script>

<template>
  <DefaultTemplate>
    <template #header>
      <TheMenu v-bind="page.menu" />
    </template>
    <template #content>
      <RouterView />
    </template>
  </DefaultTemplate>
</template>

<style>
#app {
  min-height: 100vh;
  min-width: 100vw;
  background: #f1f4f5;
}
</style>
