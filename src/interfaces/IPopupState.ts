export interface IPopupState {
  message: string;
  messageIsOpen: boolean;
  messageIsError: boolean;
  isOpen: boolean;
  formIsOpen: boolean;
  previewIsOpen: boolean;
  infoIsOpen: boolean;
  infoTitle: string;
  infoText: string;
  infoButtonText: string;
  form: React.FC;
}
