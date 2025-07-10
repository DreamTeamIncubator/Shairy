import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const EmailDefault: Story = {
  args: {
    variant: 'email',
    placeholder: 'Epam@epam.com',
    showIcon: true,
    error: '',
    disabled: false,
    onChange: () => {},
  },
}

export const SearchDefault: Story = {
  args: {
    ...EmailDefault.args,
    variant: 'search',
  },
}
