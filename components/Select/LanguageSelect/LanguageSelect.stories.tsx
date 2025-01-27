import { Meta, StoryObj } from "@storybook/react";
import { LanguageSelect } from "./LanguageSelect";

const meta: Meta<typeof LanguageSelect> = {
  title: 'Example/LanguageSelect',
  component: LanguageSelect,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}
