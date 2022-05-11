import ListCard from "./ListCard.vue";

export default {
  title: "Cards / ListCard",
  component: ListCard,
  args: {
    title: "Habilidades",
    list: [
      "Verringert allen von Teampartnern Erlitten Schaden a 75%.",
      "Decreases all direct damage taken by friendly Pokémon to 0.75×",
      "Ein Pokémon mit dieser Fähigkeit kann nicht paralysiert werden",
      "Verringert allen von Teampartnern Erlitten Schaden a 75%.",
    ],
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { ListCard },
  setup() {
    return { args };
  },
  template: `
    <div class="default--storybook w-600">
      <ListCard v-bind="args"/>
    </div>
  `,
});
