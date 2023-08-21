import { IOrderState } from './';

export interface IPopupState {
  isOpen: boolean;

  form: {
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
    buttonSecondText?: string;
    onClick?: () => void;
    onClickSecond?: () => void;
    src: string;
  };

  message: {
    isOpen: boolean;
    isError: boolean;
    text: string;
  };

  order: {
    isOpen: boolean;
    content: IOrderState;
  };
}
