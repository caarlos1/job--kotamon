import PokemonCard from "./PokemonCard.vue";

export default {
  title: "Cards / PokemonCard",
  component: PokemonCard,
  args: {
    image:
      "https://1.bp.blogspot.com/-3LKRip6A1J0/YF4uqi6qCjI/AAAAAAAAH_I/ul08ZE5TIwAKpCO7kmbo23yf8Mkpq6PMwCLcBGAsYHQ/s606/char-eevee.png",
    name: "Eevee",
    cod: 133,
    type: "normal",
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
