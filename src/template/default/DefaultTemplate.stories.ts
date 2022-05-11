import DefaultTemplate from "./DefaultTemplate.vue";
import TheMenu from "../../components/header/menu/TheMenu.vue";
import InputSearchUI from "../../components/ui/input-search/InputSearchUI.vue";
import PokemonGrid from "../../components/cards/grid-pokemon/PokemonGrid.vue";

import { menu } from "../../components/header/menu/util/mock";
import { pokemonList } from "../../components/cards/grid-pokemon/util/mock";

import "./util/storybook.css";

export default {
  title: "Template / DefaultTemplate",
  component: DefaultTemplate,
  args: {
    menu,
    page: {
      search: {
        placeholder: "Pesquise por nome ou código",
      },
      grid: {
        title: "Pokemons",
        list: [...pokemonList(25, true)],
      },
    },
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { DefaultTemplate, TheMenu, InputSearchUI, PokemonGrid },
  setup() {
    return { args };
  },
  template: `
    <div class="">
      <DefaultTemplate v-bind="args">
        <template #header>
          <TheMenu v-bind="args.menu" />
        </template>
        <template #content>
          <div class="template-default--flex">
            <InputSearchUI v-bind="args.page.search" />
            <PokemonGrid v-bind="args.page.grid"/>
            <div class="page__footer"></div>
          </div>
        </template>
      </DefaultTemplate>
    </div>
  `,
});
