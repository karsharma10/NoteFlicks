import styles from './core.module.css';

export default function Header({ saveNote }: any): JSX.Element {

  return (
    <div className={styles.headerContainer} style={{ fontSize: '24px', padding: '0.1px' }}>
      <p className={styles.headerTitle}>NoteFlicks</p>
      <button onClick={() => saveNote()} className={styles.headerShareButton}>Share</button>
    </div>
  );
}