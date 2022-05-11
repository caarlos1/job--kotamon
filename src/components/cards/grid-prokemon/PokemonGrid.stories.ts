import PokemonGrid from "./PokemonGrid.vue";
import { pokemonList } from "./util/mock";

export default {
  title: "Cards / PokemonGrid",
  component: PokemonGrid,
  args: {
    title: "Pokemons",
    list: [],
    size: 25,
    click: true,
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: { size: number; click: boolean }) => ({
  components: { PokemonGrid },
  setup() {
    return {
      args: {
        ...args,
        list: pokemonList(args.size, args.click),
      },
    };
  },
  template: `
    <div class="default--storybook w-850">
      <PokemonGrid v-bind="args"/>
    </div>
  `,
});
