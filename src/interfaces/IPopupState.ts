export interface IPopupState {
  message: '';
  messageIsOpen: boolean;
  messageIsError: boolean;
  isOpen: boolean;
  formIsOpen: boolean;
  previewIsOpen: boolean;
  infoIsOpen: boolean;
  infoTitle: '';
  infoText: '';
  infoButtonText: '';
  form: React.FC;
}
