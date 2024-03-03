import React, { Dispatch, SetStateAction } from 'react';
import styles from './markdown.module.css';

export default function MarkdownInput({ setToken }: { setToken: Dispatch<SetStateAction<string>>} ): JSX.Element {


  return (
    <div className={styles.markdownInputContainer}>
      <textarea
        className={styles.markdownTextInput}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your markdown here"
      />
    </div>
  );
}