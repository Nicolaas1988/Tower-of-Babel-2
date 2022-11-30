import TreeOfLexicon from "../treeOfLexicon/TreeOfLexicon";
import styles from "./gameActions.module.css";
function GameActions() {
  return (
    <div className={styles.gameActionsContainer}>
      <div className={styles.gameAction}> Action 1 </div>
      <div className={styles.gameAction}> Action 2 </div>
      <TreeOfLexicon />

      <div className={styles.gameAction}> Action 3 </div>
      <div className={styles.gameAction}> Action 4 </div>
    </div>
  );
}

export default GameActions;
