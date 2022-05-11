import TheMenu from "./TheMenu.vue";
import { logo } from "../logo/util/mock";

export default {
  title: "Header / TheMenu",
  component: TheMenu,
  args: {
    logo,
    userImage:
      "https://gravatar.com/avatar/9a82ba52769cbc22951a7cf516124307?s=250",
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { TheMenu },
  setup() {
    return { args };
  },
  template: `
    <div class="default--storybook no-p">
      <TheMenu v-bind="args" />
    </div>
  `,
});
