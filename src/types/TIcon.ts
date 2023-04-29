export type TIconFileNames =
  'clear-field.svg'
  | 'password-hidden.svg'
  | 'password-shown.svg'

export type TIconFiles = {
  [Key in TIconFileNames]: string;
}
