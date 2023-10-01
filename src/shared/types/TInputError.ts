import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type TInputForError = {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  className?: string;
}