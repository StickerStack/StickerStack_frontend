export interface IPopupState {
  isOpen: boolean;

  popup: {
    isOpen: boolean;
    element: React.FC;
  };

  preview: {
    isOpen: boolean;
  };

  info: {
    isOpen: boolean;
    title: string;
    text: string;
    buttonText: string;
  };

  message: {
    isOpen: boolean;
    isError: boolean;
    text: string;
  };
}