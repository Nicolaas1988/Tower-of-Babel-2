import TreeOfLexicon from "../treeOfLexicon/TreeOfLexicon";
import styles from "./gameActions.module.css";
import buildImage from "../../images/build.png";
import battleImage from "../../images/battle.png";
import wordsImage from "../../images/words.png";
import spellsImage from "../../images/spells.png";

function GameActions() {
  return (
    <div className={styles.gameActionsContainer}>
      <div className={styles.gameAction}>
        <div className={styles.gameActionIcon}>
          <img src={wordsImage} alt="make words" />
        </div>
        Make Words
      </div>
      <div className={styles.gameAction}>
        <div className={styles.gameActionIcon}>
          <img src={buildImage} alt="build" />
        </div>
        Build Tower
      </div>
      <TreeOfLexicon />

      <div className={styles.gameAction}>
        <div className={styles.gameActionIcon}>
          <img src={battleImage} alt="battle" />
        </div>
        Battle Words
      </div>
      <div className={styles.gameAction}>
        <div className={styles.gameActionIcon}>
          <img src={spellsImage} alt="spells" />
        </div>
        Get spells
      </div>
    </div>
  );
}

export default GameActions;
