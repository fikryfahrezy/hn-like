import style from '../styles/Header.module.css';

type HeaderProps = any;

const Header = ({ pageTitle, pageDescription }: HeaderProps) => (
  <header style={{ padding: '1rem' }} className={style.header}>
    <h1>{pageTitle}</h1>
    <p>{pageDescription}</p>
  </header>
);

export default Header;
