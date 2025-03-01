import { Meta, StoryObj } from "@storybook/react"
import { RadixSelect } from "./RadixSelect";


const meta: Meta<typeof RadixSelect> = {
  title: 'Example/RadixSelect',
  component:  RadixSelect,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showPlaceholderLabel: false,
    placeholderLabel: "Select-box", 
    options: [
      { value: "Select-box1", label: "Select-box1" },
      { value: "Select-box2", label: "Select-box2" },
      { value: "select-box3", label: "Select-box3" },
    
    ],
    placeholder: "Select-value",
    onValueChange: (value) => console.log(value),
    disabled: false, 
  },
};

