import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export interface IInput {
  name: string;
  type: 'email' | 'password' | 'text';
  labelLink?: { text: string; onClick: () => void };
  id?: string;
  value?: string | number;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  option?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  className?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  showSubButton?: boolean;
  onClear?: () => void;
}
