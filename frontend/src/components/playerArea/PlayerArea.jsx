import styles from "./playerArea.module.css";

function PlayerArea(props) {
  return (
    <div className={styles.playerAreaContainer}>
      <div className={styles.playerAreaHeader}> {props.username}</div>
    </div>
  );
}

export default PlayerArea;
