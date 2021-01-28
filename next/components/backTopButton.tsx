import { useState, useRef, useEffect } from 'react';
import style from '../styles/BackToTop.module.css';

/**
 * NOTE: Scroll to Top Component Reference
 * begin Back to Top button
 * https://codepen.io/alexandr-kazakov/pen/yMRPOR?editors=1010
 */
const BackTopButton = () => {
  const isMounted = useRef(false);
  const [showButton, setShowButton] = useState(false);

  const trackScroll = () => {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (isMounted.current) {
      if (scrolled > coords) {
        setShowButton(true);
      } else if (scrolled < coords) {
        setShowButton(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;

    // NOTE: Window object in React
    // https://stackoverflow.com/questions/37081803/how-do-i-use-the-window-object-in-reactjs
    window.addEventListener('scroll', trackScroll);

    return () => {
      isMounted.current = false;
    };
  }, []);

  const backToTop = () => {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  };

  return (
    showButton && (
      <button className={style.backToTop} onClick={backToTop}>
        &uarr;
      </button>
    )
  );
};

export default BackTopButton;
