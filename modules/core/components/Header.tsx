import styles from './core.module.css';

export default function Header({ saveNote }: any): JSX.Element {

  return (
    <div className={styles.headerContainer}>
      <p className={styles.headerTitle}>NoteFlicks</p>
      <button onClick={() => saveNote()} className={styles.headerShareButton}>Share</button>
    </div>
  );
}