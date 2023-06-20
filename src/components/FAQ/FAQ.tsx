import { useState } from 'react';
import cn from 'classnames';

import { ButtonWithText, TitlePage } from '../UI';

import styles from './FAQ.module.scss';
import { Dropdown } from '../Dropdown/Dropdown';

interface IProps {
  image?: string | ArrayBuffer | null;
  className?: string;
  onLoadImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage?: () => void;
}

const questions = [
  {
    id: 1,
    question: 'Какие формы стикеров вы можете сделать?',
    answer:
      'Мы можем изготовить стикеры в различных формах, включая круглые, овальные, квадратные, прямоугольные и другие нестандартные формы. Если у вас есть особые пожелания, свяжитесь с нами, и мы постараемся вам помочь.',
  },
  {
    id: 2,
    question: 'Можно ли заказать стикеры нестандартной формы?',
    answer: 'Да, мы можем изготовить стикеры в любой нестандартной форме по вашему желанию.',
  },
  {
    id: 3,
    question: 'Какой формат файлов вы принимаете для загрузки на сайт?',
    answer:
      'Мы принимаем файлы в форматах JPEG, PNG, PDF, SVG, AI, EPS, CDR. Вы также можете загрузить макет стикера в любом другом формате, и мы постараемся его преобразовать в нужный формат.',
  },
  {
    id: 4,
    question: 'Как долго займет изготовление моего заказа?',
    answer:
      'Мы обычно изготавливаем стикеры в течение 1-2 рабочих дней. Время изготовления может зависеть от сложности и объема заказа. Мы свяжемся с вами, если возникнут какие-либо задержки.',
  },
  {
    id: 5,
    question: 'Какая технология печати используется для изготовления стикеров?',
    answer:
      'Мы используем современную технологию цифровой печати на виниловой пленке, которая обеспечивает высокое качество изображения и долговечность стикера.',
  },
  {
    id: 6,
    question: 'Какие способы оплаты вы принимаете?',
    answer:
      'Мы принимаем оплату банковскими картами, электронными кошельками, банковскими переводами и наличными при получении заказа.',
  },
];

const FAQ: React.FC<IProps> = ({ image, className, onLoadImage, deleteImage }: IProps) => {
  return (
    <ul className={cn(styles.container, className)}>
      {questions.map((item) => (
        <li key={item.id}>
          <Dropdown heading={item.question} content={item.answer} id={item.id} />
        </li>
      ))}
    </ul>
  );
};

export { FAQ };
