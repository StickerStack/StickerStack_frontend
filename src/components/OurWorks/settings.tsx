import cn from 'classnames';

import styles from './OurWorks.module.scss';

const settings = {
  className: `${styles.slider}`,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  speed: 400,
  autoplaySpeed: 4000,
  cssEase: 'linear',
  infinite: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1230,
      settings: {
        slidesToShow: 3,
      },
    },

    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
      },
    },

    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        dots: true,
        dotsClass: cn('slick-dots', styles.dots),
      },
    },
  ],
};

export { settings };
