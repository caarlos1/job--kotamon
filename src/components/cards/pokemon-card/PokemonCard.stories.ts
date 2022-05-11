import PokemonCard from "./PokemonCard.vue";
import { pokemon } from "./util/mock";

export default {
  title: "Cards / PokemonCard",
  component: PokemonCard,
  args: {
    ...pokemon,
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { PokemonCard },
  setup() {
    return { args };
  },
  template: `
    <div class="default--storybook w-400">
      <PokemonCard v-bind="args"/>
    </div>
  `,
});
