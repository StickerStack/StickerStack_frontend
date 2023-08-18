import cn from 'classnames';
import { ButtonWithText, Container, TitlePage } from '../../UI';

import styles from './PolicyPage.module.scss';
import { useRef, useEffect } from 'react';
import { policy } from '../../../utils/constants';

const PolicyPage: React.FC = () => {
  const sectionRef = useRef<Array<HTMLDivElement>>([]);
  useEffect(() => {
    sectionRef.current = sectionRef.current.slice(0, policy.sections.length);
  }, [policy.sections]);

  return (
    <main className={styles.policy}>
      <Container className={styles.policy_container}>
        <TitlePage type='main-title'>{policy.title}</TitlePage>
        <div className={styles.content}>
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
                      top: sectionRef.current[i].offsetTop + 120,
                    });
                }}
              >
                {section.title.slice(3)}
              </ButtonWithText>
            ))}
          </section>
        </div>
      </Container>
    </main>
  );
};

export { PolicyPage };
