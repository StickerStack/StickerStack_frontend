import { useState, useCallback, useEffect } from 'react';
import styles from './ScrollBar.module.scss';

const ScrollBar: React.FC = () => {
  const [y, setY] = useState(window.scrollY);
  const [visibleBorder, setVisibleBorder] = useState(false);

  const handleNavigation = useCallback(() => {
    if (window.scrollY) {
      setVisibleBorder(true);
    } else setVisibleBorder(false);
    setY(window.scrollY);
    // eslint-disable-next-line
  }, [y]);

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <div
      className={styles.bar}
      style={
        window.innerHeight / document.body.clientHeight < 0.6 && visibleBorder
          ? {
              opacity: 0.9,
              width:
                ((scrollY +
                  window.innerHeight *
                    ((scrollY + window.innerHeight) / document.body.clientHeight)) /
                  document.body.clientHeight) *
                (document.body.clientWidth - 2),
            }
          : {}
      }
    />
  );
};

export { ScrollBar };
