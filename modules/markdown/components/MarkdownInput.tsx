import React, { useEffect, useRef, useState } from 'react';
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
  const [lineNumbers, setLineNumbers] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (lineNumberRef.current && textAreaRef.current) {
      lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  const updateDocument = debounce(async (content: string) => {
    if (!noteDocument.ownerId || userId === noteDocument.ownerId) {
      const docRef = doc(db, 'notes', documentId);
      await setDoc(docRef, { content, ownerId: userId }, { merge: true });
    }
  }, 500);

  useEffect(() => {
    const lines = noteDocument.content.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1).join('\n'));
  }, [noteDocument.content]);

  useEffect(() => {
    updateDocument(noteDocument.content);
  }, [noteDocument]);

  return (
    <div className={styles.markdownInputContainer} onScroll={handleScroll}>
      <div className={styles.lineNumbers} ref={lineNumberRef}>
        {lineNumbers}
      </div>
      <textarea
        ref={textAreaRef}
        className={styles.markdownTextInput}
        value={noteDocument.content}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your markdown here"
        onScroll={handleScroll}
      />
    </div>
  );
};

export default MarkdownInput;
