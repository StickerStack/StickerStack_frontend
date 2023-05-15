import cn from "classnames";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";

import { IconButton } from "../IconButton/IconButton";

import styles from "./TooltipCustom.module.scss";

interface IProps {
  className?: string;
  text: string,
}

const TooltipCustom: React.FC<IProps> = ({ className, text }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <div className={cn(styles.tooltip, className)} onMouseLeave={handleMouseLeave}>
      <IconButton
        className={styles.icon}
        visible={true}
        icon={'tooltip-icon.svg'}
        onMouseEnter={handleMouseEnter}
      />

      <AnimatePresence>
        {
          isHovered && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              className={styles.container}
            >
              <div className={styles.content}>
                { text }
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  );
};

export {TooltipCustom};