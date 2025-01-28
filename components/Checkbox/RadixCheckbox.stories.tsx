import { Meta, StoryObj } from "@storybook/react"
import { RadixCheckbox } from "./RadixCheckbox";


const meta: Meta<typeof RadixCheckbox > = {
  title: 'Example/RadixCheckbox',
  component: RadixCheckbox,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    showLabel: false, 
    textLabel: "Check-box"
  },
};
