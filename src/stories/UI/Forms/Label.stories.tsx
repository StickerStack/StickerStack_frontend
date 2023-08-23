import type { Meta, StoryObj } from '@storybook/react';

import { Label, TextUnderline } from "../../../components/UI";

const meta = {
  title: 'UI/Forms/Label',
  component: Label,

} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Email: Story = {
  args: {
    children: 'Электронная почта',
  }
}

export const Password: Story = {
  args: {
    children: <>Пароль <TextUnderline>Забыли пароль?</TextUnderline></>,
  }
}

