import type { Meta, StoryObj } from '@storybook/react';

import { Input } from "../../../components/UI";

const meta = {
  title: 'UI/Forms/Input',
  component: Input,

} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    placeholder: 'example@gmail.com',
    type: 'email',
  }
}

export const Password: Story = {
  args: {
    placeholder: 'Введите пароль',
    type: 'password',
  }
}