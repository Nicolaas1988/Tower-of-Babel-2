import styles from "./playerArea.module.css";

function PlayerArea(props) {
  return (
    <div className={styles.playerAreaContainer}>
      <div className={styles.playerAreaHeader}> {props.username}</div>
      <div className={styles.lettersContainer}>
        {props.letters.map((l) => {
          return <p key={Math.random()}> {Object.values(l)}</p>;
        })}
      </div>
    </div>
  );
}

export default PlayerArea;
