import { useState, useRef, useEffect } from 'react';

const backToTopComp = () => {
  // NOTE: Scroll to Top Component
  // https://codepen.io/alexandr-kazakov/pen/yMRPOR?editors=1010
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

  return {
    showButton,
    backToTop,
  };
};

export default backToTopComp;
