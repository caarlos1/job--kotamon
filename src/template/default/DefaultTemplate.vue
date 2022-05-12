<script setup lang="ts">
import { useGlobalEvents } from "../../hooks/useGlobalEvents";

defineProps({
  showSidebar: {
    type: Boolean,
    default: false,
  },
});

const globalEvents = useGlobalEvents();

const emitScroll = (e: UIEvent) => {
  globalEvents.emit<UIEvent>("template:scroll", e);
};

defineEmits([]);
</script>

<template>
  <div class="template__container">
    <div class="header__template">
      <slot name="header"></slot>
    </div>
    <div class="body__template">
      <div class="body__content" @scroll="emitScroll">
        <div class="body__center">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.template__container {
  position: relative;
  background: #f1f4f5;
  transition: 0.2s;
}

.header__template {
  width: 100%;
  z-index: 50;
}

.body__template {
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
}

.body__content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  margin: 0 20px;
  overflow: auto;
}

.body__center {
  width: 100%;
  max-width: 850px;
}

.content__bottom {
  padding: 20px;
}

.sidebar__close svg {
  display: none;
}

.body__area {
  flex: 1 1;
}

@media (min-width: 768px) {
  .template__container {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    transition: 0.2s;
  }

  .body__content {
    margin: 0;
  }
}

@media (max-width: 768px) {
  .body__template {
    margin-top: 60px;
  }
  .header__template {
    z-index: 20;
    position: fixed;
    top: 0;
    right: 0;
  }

  .body__area {
    height: 100%;
    width: 100%;
  }
}

/** component animations */

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(500px);
}

.close-area-enter-active,
.close-area-leave-active {
  transition: all 0.3s ease;
}

.close-area-enter-from,
.close-area-leave-to {
  opacity: 0;
}
</style>
