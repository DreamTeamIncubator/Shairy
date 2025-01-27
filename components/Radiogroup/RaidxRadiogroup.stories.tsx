import { Meta, StoryObj } from "@storybook/react"
import { RadixRadioGroup } from "./RadixRadiogroup";


const meta: Meta<typeof RadixRadioGroup> = {
  title: 'Example/RadixRadioGroup',
  component: RadixRadioGroup,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    textLabel: "RadioGroup"
  },
};
