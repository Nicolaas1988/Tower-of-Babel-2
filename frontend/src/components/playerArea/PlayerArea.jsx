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
        {props.words.map((w, index, arr) => {
          return (
            <WordsArea
              id={`${props.id}-word-${index + 1}`}
              key={`${props.id}-word-${index}`}
              allowedLetters={props.letters}
              word={props.words[index]}
              idx={index}
            />
          );
        })}
        {/* <WordsArea
          id={`${props.id}-word-1`}
          allowedLetters={props.letters}
          word={props.words[0]}
        />
        <WordsArea
          id={`${props.id}-word-2`}
          allowedLetters={props.letters}
          word={props.words[1]}
        />
        <WordsArea
          id={`${props.id}-word-3`}
          allowedLetters={props.letters}
          word={props.words[2]}
        />
        <WordsArea
          id={`${props.id}-word-4`}
          allowedLetters={props.letters}
          word={props.words[3]}
        />
        <WordsArea
          id={`${props.id}-word-5`}
          allowedLetters={props.letters}
          word={props.words[4]}
        />
        <WordsArea
          id={`${props.id}-word-6`}
          allowedLetters={props.letters}
          word={props.words[5]}
        /> */}
      </div>
    </div>
  );
}

export default PlayerArea;
