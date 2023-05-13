import cn from "classnames";
import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { IconButton } from "../IconButton/IconButton";

import styles from "./TooltipCustom.module.scss";

interface IProps {
  className?: string;
  text: string,
}

const TOOLTIP_TRANSITION_TIMEOUT = 300;

const TooltipCustom: React.FC<IProps> = ({ className, text }: IProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const nodeRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <div className={cn(styles.tooltip, className)}>
      <IconButton
        className={styles.icon}
        visible={true}
        icon={'tooltip-icon.svg'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <CSSTransition
        classNames={{
          enter: styles.transitionEnter,
          enterActive: styles.transitionEnterActive,
          enterDone: styles.transitionEnterDone,
          exit: styles.transitionExit,
          exitActive: styles.transitionExitActive,
          exitDone: styles.transitionExitDone
        }}
        nodeRef={nodeRef}
        in={isHovered}
        timeout={TOOLTIP_TRANSITION_TIMEOUT}
        unmountOnExit
      >
        <div className={styles.container} ref={nodeRef}>
          <div className={styles.content}>
            { text }
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export {TooltipCustom};