import styles from "../header/header.module.css";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}> Tower of Babel</div>
      <div></div>
    </div>
  );
}

export default Header;
