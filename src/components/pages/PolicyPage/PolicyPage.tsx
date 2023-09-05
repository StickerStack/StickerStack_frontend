import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { PolicyNavigation } from '../../PolicyNavigation/PolicyNavigation';
import { ButtonCustom, ButtonWithText, Container, TitlePage } from '../../UI';
import { COOKIE } from '../../../utils/constants';

import styles from './PolicyPage.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  policy: {
    title: string;
    sections: Array<{
      id: number;
      title: string;
      paragraphs: Array<{ id: number; text: string }>;
    }>;
  };
}

const PolicyPage: React.FC<Props> = ({ policy }: Props) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionRef = useRef<Array<HTMLDivElement>>([]);
  useEffect(() => {
    sectionRef.current = sectionRef.current.slice(0, policy.sections.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policy.sections]);

  return (
    <main className={styles.policy}>
      {location.pathname === COOKIE ? null : (
        <ButtonCustom
          type='arrow'
          label={!menuOpen ? 'Открыть меню' : 'Закрыть меню'}
          className={cn(styles.button, menuOpen && styles.button_open)}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      )}
      {menuOpen && (
        <AnimatePresence>
          <motion.div className={styles.overlay}>
            <motion.div
              className={styles.background}
              initial={{
                opacity: 0,
              }}
              animate={{
                transition: {
                  duration: 0.25,
                },
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  opacity: { duration: 0.25 },
                },
              }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.section
              className={styles.menu_open}
              initial={{
                opacity: 0,
                transform: 'translate(340px)',
              }}
              style={{ overflow: 'hidden' }}
              animate={{
                opacity: 1,
                transform: 'translate(0px)',
                transition: {
                  transform: { duration: 0.4 },
                  opacity: { duration: 0.2 },
                },
              }}
              exit={{
                opacity: 0,
                transform: 'translate(340px)',
                transition: { transform: { duration: 0.4 }, opacity: { duration: 0.2 } },
              }}
            >
              {policy.sections.map((section, i) => (
                <motion.div key={section.id}>
                  <ButtonWithText
                    theme='no-border'
                    className={styles.menu_item}
                    onClick={() => {
                      sectionRef.current &&
                        window.scrollTo({
                          behavior: 'smooth',
                          top: sectionRef.current[i].offsetTop - 55,
                        });
                      setMenuOpen(false);
                    }}
                  >
                    {section.title.slice(3)}
                  </ButtonWithText>
                </motion.div>
              ))}
            </motion.section>
          </motion.div>
        </AnimatePresence>
      )}
      <Container className={styles.policy_container}>
        <div className={styles.content}>
          {
            <div className={styles.nav}>
              <PolicyNavigation />
            </div>
          }
          <div className={styles.image} />
          <TitlePage type='main-title' className={styles.title}>
            {policy.title}
          </TitlePage>
          <section className={styles.lines}>
            {policy.sections.map((section, i) => (
              <div
                key={section.id}
                id={`${section.id}`}
                ref={(section: HTMLDivElement) => (sectionRef.current[i] = section)}
              >
                <TitlePage type='section-title' className={styles.title_section}>
                  {section.title}
                </TitlePage>
                {section.paragraphs.map((paragraph) => (
                  <p className={styles.text} key={paragraph.id}>
                    {paragraph.text}
                  </p>
                ))}
              </div>
            ))}
          </section>
        </div>
        <section className={styles.menu}>
          {policy.sections.map((section, i) => (
            <ButtonWithText
              theme='no-border'
              className={styles.menu_item}
              key={section.id}
              onClick={() => {
                sectionRef.current &&
                  window.scrollTo({
                    behavior: 'smooth',
                    top: sectionRef.current[i].offsetTop - 55,
                  });
              }}
            >
              {section.title.slice(3)}
            </ButtonWithText>
          ))}
        </section>
      </Container>
    </main>
  );
};

export { PolicyPage };
