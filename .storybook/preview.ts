import type { Preview } from "@storybook/react";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Higher Order Components",
          "Lower Order Components",
          ["ChatInput", "ChatBubble", "ChatNavBar"],
        ],
      },
    },
  },
};

export default preview;
