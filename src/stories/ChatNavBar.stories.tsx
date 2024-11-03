import type { Meta, StoryObj } from "@storybook/react";

import { ChatNavBar } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Lower Level Components/ChatNavBar",
  component: ChatNavBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "fullscreen",
    backgrounds: {
      values: [{ name: "dark", value: "#333" }],
    },

    docs: {
      description: {
        component: `A navigation header bar for chat components.`,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    title: { control: "text" },
  },
} satisfies Meta<typeof ChatNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    title: "Jane Doe",
    subtitle: "Active now",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    onClose: () => alert("Back button clicked!"),
  },
};

export const WithoutBackButton: Story = {
  args: {
    hideBackButton: true,
    title: "Jane Doe",
    subtitle: "Active now",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    onClose: () => alert("Back button clicked!"),
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: "Jane Doe",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    onClose: () => alert("Back button clicked!"),
  },
};

export const WithoutProfilePhoto: Story = {
  args: {
    title: "Jane Doe",
    onClose: () => alert("Back button clicked!"),
  },
};

export const UnreadCount: Story = {
  args: {
    hideBackButton: false,
    backButtonUnreadCount: 1,
    title: "Jane Doe",
    subtitle: "Active now",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    onClose: () => alert("Back button clicked!"),
  },
};

export const RenderButtonsViaSlot: Story = {
  args: {
    title: "Jane Doe",
    subtitle: "Active now",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    onClose: () => alert("Back button clicked!"),
    rightSlot: (
      <button className="text-white mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
      </button>
    ),
  },
};

export const LongTexts: Story = {
  args: {
    title:
      "A very very long group name that probably exceeds the width of the screen",
    subtitle:
      'Click here for more information about "A very very long group name that porbably exceeds the width of the screen"',
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    onClose: () => alert("Back button clicked!"),
  },
};

export const Clickable: Story = {
  args: {
    title: "Jane Doe",
    subtitle: "Click for more info",
    onClick: () => alert("Clicked!"),
    onClose: () => alert("Back button clicked!"),
  },
};
