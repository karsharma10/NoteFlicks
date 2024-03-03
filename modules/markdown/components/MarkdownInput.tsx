import React, { useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import styles from './markdown.module.css';
import { debounce } from '../utils/debounce';
import { db } from '../../../configurations/fireabseConfig';
import { NoteDocument } from '../../core/type/saveNote';

interface MarkdownInputProps {
  setToken: (val: string) => void;
  noteDocument: NoteDocument;
  documentId: string;
  userId: string;
}

const MarkdownInput: React.FC<MarkdownInputProps> = ({ setToken, noteDocument, documentId, userId }): React.JSX.Element => {

  const updateDocument = debounce(async (content: string) => {
    if (!noteDocument.ownerId || userId === noteDocument.ownerId) {
      const docRef = doc(db, 'notes', documentId);
      await setDoc(docRef, { content, ownerId: userId }, { merge: true });
    }
  }, 500);

  useEffect(() => {
    updateDocument(noteDocument.content);
  }, [noteDocument]);

  return (
    <div className={styles.markdownInputContainer}>
      <textarea
        className={styles.markdownTextInput}
        value={noteDocument.content}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your markdown here"
      />
    </div>
  );
};

export default MarkdownInput;
