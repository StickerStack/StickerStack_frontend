/* eslint-disable @typescript-eslint/no-empty-function */
import { MouseEventHandler } from 'react';
import cn from 'classnames';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './OurWorks.module.scss';

const NextArrow = (props: {
  className: string;
  style: object;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={cn(className, styles.next_arrow)}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: {
  className: string;
  style: object;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={cn(className, styles.prev_arrow)}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
};

const settings = {
  className: `${styles.slider}`,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  infinite: true,
  nextArrow: <NextArrow className={''} style={{}} onClick={() => {}} />,
  prevArrow: <PrevArrow className={''} style={{}} onClick={() => {}} />,
};

export { NextArrow, PrevArrow, settings };
