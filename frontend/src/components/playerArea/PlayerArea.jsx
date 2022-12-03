import styles from "./playerArea.module.css";
import WordsArea from "../wordsArea/WordsArea";

function PlayerArea(props) {
  return (
    <div className={styles.playerAreaContainer}>
      <div className={styles.playerAreaHeader}> {props.username}</div>
      <div className={styles.lettersContainer}>
        {props.letters.map((l, index, arr) => {
          return (
            <span
              key={`${props.id}-letter-${index}`}
              id={`${props.id}-letter-${index}`}
            >
              {Object.values(l)}
            </span>
          );
        })}
      </div>
      <div className={styles.wordsContainer}>
        <WordsArea id={`${props.id}-word-1`} allowedLetters={props.letters} />
        <WordsArea id={`${props.id}-word-2`} allowedLetters={props.letters} />
        <WordsArea id={`${props.id}-word-3`} allowedLetters={props.letters} />
        <WordsArea id={`${props.id}-word-4`} allowedLetters={props.letters} />
        <WordsArea id={`${props.id}-word-5`} allowedLetters={props.letters} />
        <WordsArea id={`${props.id}-word-6`} allowedLetters={props.letters} />
      </div>
    </div>
  );
}

export default PlayerArea;
