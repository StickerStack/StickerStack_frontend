import { Transition, TransitionStatus } from 'react-transition-group';

import CSS from 'csstype';

interface IProps {
  children: React.ReactNode;
  state: boolean;
  style?: CSS.Properties;
  timeout?: number;
}

const TransitionsComponent: React.FC<IProps> = ({ children, style = { transition: `opacity 500ms ease-in-out`, opacity: 0 }, state, timeout = 300 }: IProps) => {
  const transitionsStyle: Partial<Record<TransitionStatus, CSS.Properties>> = {
    entering: {
      display: 'block'
    },
    entered: {
      opacity: 1,
      display: 'block'
    },
    exiting: {
      opacity: 0,
      display: 'block'
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