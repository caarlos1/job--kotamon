import PokemonGrid from "./PokemonGrid.vue";
import { pokemonList } from "./util/mock";

export default {
  title: "Cards / PokemonGrid",
  component: PokemonGrid,
  args: {
    list: pokemonList(),
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { PokemonGrid },
  setup() {
    return { args };
  },
  template: `
    <div class="default--storybook">
      <PokemonGrid v-bind="args"/>
    </div>
  `,
});
