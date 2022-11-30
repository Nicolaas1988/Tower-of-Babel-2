import React from "react";
import styles from "./treeOfLexicon.module.css";

function TreeOfLexicon() {
  return (
    <div className={styles.circle} style={{ "--total": "12" }}>
      <div className={styles.stat} style={{ "--i": "1" }}>
        a
      </div>
      <div className={styles.stat} style={{ "--i": "2" }}>
        b
      </div>
      <div className={styles.stat} style={{ "--i": "3" }}>
        c
      </div>
      <div className={styles.stat} style={{ "--i": "4" }}>
        d
      </div>
      <div className={styles.stat} style={{ "--i": "5" }}>
        e
      </div>
      <div className={styles.stat} style={{ "--i": "6" }}>
        f
      </div>
      <div className={styles.stat} style={{ "--i": "7" }}>
        g
      </div>
      <div className={styles.stat} style={{ "--i": "8" }}>
        h
      </div>
      <div className={styles.stat} style={{ "--i": "9" }}>
        i
      </div>
      <div className={styles.stat} style={{ "--i": "10" }}>
        j
      </div>
      <div className={styles.stat} style={{ "--i": "11" }}>
        k
      </div>
      <div className={styles.stat} style={{ "--i": "12" }}>
        l
      </div>
    </div>
  );
}

export default TreeOfLexicon;
