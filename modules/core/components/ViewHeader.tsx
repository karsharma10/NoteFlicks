import styles from './core.module.css';

export default function ViewHeader({ saveNote }: any): JSX.Element {

    return (
        <div className={styles.headerContainer} style={{ fontSize: '19px', padding: '10px' }}>
            <p className={styles.headerTitle}>NoteFlicks</p>
        </div>
    );
}