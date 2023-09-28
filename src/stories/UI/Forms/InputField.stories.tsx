import type { Meta, StoryObj } from '@storybook/react';

import { InputField, Label, TextUnderline, Input } from '../../../components/UI';

const meta = {
  title: 'UI/Forms/InputField',
  component: InputField,
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    children: (
      <>
        <Label>Электронная почта</Label>
        <Input placeholder='example@gmail.com' />
      </>
    ),
  },
};

export const Password: Story = {
  args: {
    className: 'password',
    children: (
      <>
        <Label>
          Пароль <TextUnderline>Забыли пароль?</TextUnderline>
        </Label>
        <Input placeholder='example@gmail.com' />
      </>
    ),
  },
};
