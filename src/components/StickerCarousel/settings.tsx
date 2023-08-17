/* eslint-disable @typescript-eslint/no-empty-function */
import { MouseEventHandler } from 'react';
import cn from 'classnames';

import styles from './StickerCarousel.module.scss';

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
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  speed: 500,
  infinite: false,

  nextArrow: <NextArrow className={''} style={{}} onClick={() => {}} />,
  prevArrow: <PrevArrow className={''} style={{}} onClick={() => {}} />,
};

export { NextArrow, PrevArrow, settings };
