
import { Input } from '@/components/Input/Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmailDefault: Story = {
  args: {
    variant: "email",
    placeholder: 'Epam@epam.com',
    showIcon: true,
    error: '',
    disabled: false
  },
};

export const SearchDefault: Story = {
  args: {
    ...EmailDefault.args,
    variant: "search",
  },
};
