import { Transition, TransitionStatus } from 'react-transition-group';

import CSS from 'csstype';

interface IProps {
  children: React.ReactNode;
  state: boolean;
  style?: CSS.Properties;
  timeout?: number;
  display?: string;
}

const TransitionsComponent: React.FC<IProps> = ({ children, style = { transition: `opacity 500ms ease-in-out`, opacity: 0 }, state, timeout = 300, display = 'block' }: IProps) => {
  const transitionsStyle: Partial<Record<TransitionStatus, CSS.Properties>> = {
    entering: {
      display: display
    },
    entered: {
      opacity: 1,
      display: display
    },
    exiting: {
      opacity: 0,
      display: display
    },
    exited: {
      opacity: '0',
      display: 'none'
    }
  };

  return(
    <Transition in={state} timeout={timeout}>
       {
          (state: TransitionStatus)=> (
            <div style={{
              ...style,
              ...transitionsStyle[state]
              }}>{ children }</div>   
          )
        }
    </Transition>
  );
};

export { TransitionsComponent };