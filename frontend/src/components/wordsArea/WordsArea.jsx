import { useEffect, useState } from "react";
import styles from "./wordsArea.module.css";

function WordsArea(props) {
  const [allowedLetters, setAllowedLetters] = useState([]);
  // const [word, setWord] = useState(Object.values(props.word));
  const [word, setWord] = useState("");

  useEffect(() => {
    let allowed = [];
    props.allowedLetters.forEach((el, index, arr) => {
      allowed.push(Object.values(el).toString());
    });

    setWord(Object.values(props.word));

    setAllowedLetters(allowed);
  }, [props.allowedLetters, props.word]);

  const changeHandler = (event) => {
    let value = event.target.value;
    let lastChar = value.charAt(value.length - 1);

    if (value.length > word.length) {
      if (allowedLetters.includes(lastChar)) {
        setWord(value);
        let playerData = JSON.parse(sessionStorage.getItem("playerData"));
        let socketId = sessionStorage.getItem("socketId");

        let player = playerData.find((p) => {
          return p.socketId === socketId;
        });

        // console.log(player.letters);
        let index = player.letters.findIndex(
          (el) => Object.values(el).toString() === lastChar
        );

        if (index !== -1) {
          player.letters[index][`player-${socketId}-letter-${index}`] = "";

          player.words[props.idx][props.id] = value;
        }

        const newPlayerData = playerData.map((p) => {
          if (p.socketId === socketId) {
            return player;
          } else {
            return p;
          }
        });

        console.log(`THE NEW PLAYER DATA IS ${JSON.stringify(newPlayerData)}`);

        window.sessionStorage.setItem(
          "playerData",
          JSON.stringify(newPlayerData)
        );
        window.dispatchEvent(new Event("storage"));
      } else {
        setWord((prevState) => prevState);
      }
    } else {
      setWord(value);
    }
  };

  return (
    <div className={styles.wordsArea} id={props.id}>
      <input
        className={styles.wordInput}
        onChange={changeHandler}
        value={word}
      />

      <div className={styles.wordValue}>
        <span>10 </span>
      </div>
    </div>
  );
}

export default WordsArea;
