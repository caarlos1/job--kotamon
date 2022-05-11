<script setup lang="ts">
import { maska } from "maska";
import { computed } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  id: String,
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  mask: {
    type: [Array, String],
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const vMaska = maska;

const emit = defineEmits(["update:modelValue"]);
const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="input-ui__container">
    <label class="input-ui__label" v-if="props.label" :for="props.id">
      {{ props.label }}
    </label>
    <input
      v-if="mask.length"
      class="input-ui__input"
      v-bind="props"
      v-maska="mask"
      v-model="inputValue"
      :required="required"
    />

    <input
      v-else
      class="input-ui__input"
      v-bind="props"
      v-model="inputValue"
      :required="required"
    />
  </div>
</template>

<style scoped>
.input-ui__container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-ui__label {
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 500;
}

.input-ui__input {
  background-color: #ffffff;
  border: 2px solid #eaeaea;
  height: 40px;
  border-radius: 5px;
  text-indent: 15px;
}

.input-ui__input:focus {
  outline: none;
  border: 2px solid #615cff7c;
}

[type="date"],
[type="time"] {
  padding: 0px 15px;
  text-indent: 0;
}

[type="number"] {
  padding: 0px 15px;
  text-indent: 0;
}
</style>
