import React, { useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';
import Header from './Header';
import usePostRequest from '../hooks/usePost';
import { Note } from '../../../../types/noteType';
import { SaveNoteResponse } from '../type/saveNote';
import Modal from './Modal';
import styles from './core.module.css';
import { NextRouter, useRouter } from 'next/router';


export default function Main(): React.JSX.Element {

  const [token, setToken] = useState<string>('');
  const { postData, error, loading: saveNoteLoading } = usePostRequest<SaveNoteResponse>('/api/noteshare');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [saveNoteRes, setSaveNoteRes] = useState<SaveNoteResponse | null>(null);
  const router: NextRouter = useRouter();

  function saveNote(): void {
    if (!token) return;

    const body: Note = new Note(
      'test',
      token,
      token.split('\n').length
    );

    postData(body).then((saveNoteRes: SaveNoteResponse): void => {
      console.log(`http://localhost:3000/api/noteshare/${saveNoteRes?.insertedId}`)
      setSaveNoteRes(saveNoteRes);
      setIsModalOpen(true);
    })
  }

  function modalContent() {

    if (saveNoteLoading) {
      return <h1>Loading</h1>
    }
    if (error) {
      return <h1>Error</h1>
    }

    const link = `http://localhost:3000/view?noteId=${saveNoteRes?.insertedId}`

    return (
     <div className={styles.modalContentContainer}>
       <p>{link}</p>
       <button className={styles.modalContentViewButton} onClick={() => router.push(link)}>View</button>
     </div>
    )
  }

  return (
    <div className={styles.mainContainer}>
      <Header saveNote={saveNote}></Header>
      <Modal isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             children={modalContent()}
      ></Modal>

      <div className={styles.mainMarkdownContainer}>
        <MarkdownInput setToken={setToken}></MarkdownInput>
        <MarkdownParser token={token}></MarkdownParser>
      </div>
    </div>
  );
}