import style from '../styles/BackToTop.module.css';
import backToTopComp from '../lib/backToTopComp';

/**
 * NOTE: Scroll to Top Component Reference
 * begin Back to Top button
 * https://codepen.io/alexandr-kazakov/pen/yMRPOR?editors=1010
 */
const BackTopButton = () => {
  const { backToTop, showButton } = backToTopComp();

  return (
    showButton && (
      <button className={style.backToTop} onClick={backToTop}>
        &uarr;
      </button>
    )
  );
};

export default BackTopButton;
