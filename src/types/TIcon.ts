export type TIconFileNames =
  'clear-field.svg'
  | 'password-hidden.svg'
  | 'password-shown.svg'
  | 'tooltip-icon.svg'

export type TIconFiles = {
  [Key in TIconFileNames]: string;
}
