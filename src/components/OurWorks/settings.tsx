/* eslint-disable @typescript-eslint/no-empty-function */
import { MouseEventHandler } from 'react';
import cn from 'classnames';

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
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 400,
  autoplaySpeed: 4000,
  cssEase: 'linear',
  infinite: true,

  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '60px',
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '0px',
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        centerPadding: '90px',
      },
    },
    {
      breakpoint: 860,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        centerPadding: '60px',
      },
    },
    {
      breakpoint: 790,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        centerPadding: '40px',
      },
    },
    {
      breakpoint: 690,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        centerPadding: '0px',
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        dots: true,
        dotsClass: cn('slick-dots', styles.dots),
        centerMode: true,
        centerPadding: '110px',
      },
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 1,
        dots: true,
        dotsClass: cn('slick-dots', styles.dots),
        centerMode: true,
        centerPadding: '80px',
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        dots: true,
        dotsClass: cn('slick-dots', styles.dots),
        centerMode: true,
        centerPadding: '50px',
      },
    },
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 1,
        dots: true,
        dotsClass: cn('slick-dots', styles.dots),
        centerMode: true,
        centerPadding: '30px',
      },
    },
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 1,
        dots: true,
        dotsClass: cn('slick-dots', styles.dots),
        centerMode: true,
        centerPadding: '20px',
      },
    },
    {
      breakpoint: 370,
      settings: {
        slidesToShow: 1,
        dots: true,
        dotsClass: cn('slick-dots', styles.dots),
        centerMode: true,
        centerPadding: '0px',
      },
    },
  ],
  nextArrow: <NextArrow className={''} style={{}} onClick={() => {}} />,
  prevArrow: <PrevArrow className={''} style={{}} onClick={() => {}} />,
};

export { NextArrow, PrevArrow, settings };
