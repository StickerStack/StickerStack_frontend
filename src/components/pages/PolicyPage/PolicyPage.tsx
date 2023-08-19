import { ButtonWithText, Container, TitlePage } from '../../UI';
import { useRef, useEffect } from 'react';

import { PolicyNavigation } from '../../PolicyNavigation/PolicyNavigation';

import styles from './PolicyPage.module.scss';

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
  const sectionRef = useRef<Array<HTMLDivElement>>([]);
  useEffect(() => {
    sectionRef.current = sectionRef.current.slice(0, policy.sections.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policy.sections]);

  return (
    <main className={styles.policy}>
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
