/* eslint-disable @typescript-eslint/no-empty-function */
import { MouseEventHandler } from 'react';
import cn from 'classnames';

import { pages } from '../../../utils/constants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PopupPreview.module.scss';

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
  customPaging: function (i: number) {
    return (
      <span className={styles.page_numbers}>
        {i + 1}/{pages.length}
      </span>
    );
  },
  dots: true,
  dotsClass: `slick-dots ${styles.paging}`,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay: false,
  infinite: false,
  nextArrow: <NextArrow className={''} style={{}} onClick={() => {}} />,
  prevArrow: <PrevArrow className={''} style={{}} onClick={() => {}} />,
};

export { NextArrow, PrevArrow, settings };
