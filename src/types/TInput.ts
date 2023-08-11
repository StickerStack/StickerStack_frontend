import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export type TInput = {
  id?: string;
  name?: string;
  register?: UseFormRegister<FieldValues>;
  option?: RegisterOptions;
  className?: string;
  placeholder?: string;
  type?: 'email' | 'password' | 'text' | 'tel' | 'textarea';
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
};
