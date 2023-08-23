import type { Meta, StoryObj } from '@storybook/react';

import { InputError } from "../../../components/UI";

const meta = {
  title: 'UI/Forms/InputError',
  component: InputError,

} satisfies Meta<typeof InputError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    error: { type: 'required', message: 'Это поле обязательно для заполнения' },
  }
}
