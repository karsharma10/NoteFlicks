import React, { useEffect, useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';
import Header from './Header';
import usePostRequest from '../hooks/usePost';
import { NoteDocument, SaveNoteResponse } from '../type/saveNote';
import Modal from './Modal';
import styles from './core.module.css';
import { NextRouter, useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../../../configurations/fireabseConfig';
import { AppConfiguration } from '../type/appConfiguration';

export default function Main(): React.JSX.Element {

  const [noteDocument, setNoteDocument] = useState<NoteDocument>({content: '', ownerId: ''});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [saveNoteRes, setSaveNoteRes] = useState<SaveNoteResponse | null>(null);
  const [appConfiguration, setAppConfiguration] = useState<AppConfiguration | null>(null);
  const router: NextRouter = useRouter();
  const [loading, setLoading] = useState<boolean>(false);


  const updateContent = (newContent: string) => {
    setNoteDocument(prevState => ({
      ...prevState,
      content: newContent,
    }));
  };

  useEffect(() => {
    const fetchNoteContent = async (docId: string) => {
      setLoading(true);
      const docRef = doc(db, 'notes', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNoteDocument(docSnap.data() as NoteDocument);
        setLoading(false);
      } else {
        const errMsg: string = "No such document!";
        console.log(errMsg);
        throw new Error(errMsg);
      }
    };

    const config: string | null = localStorage.getItem('appConfiguration');
    if (config) {
      const configObj = JSON.parse(config);
      setAppConfiguration(configObj);
      fetchNoteContent(configObj.noteIdList[0]);
    } else {
      const newNoteId: string = uuidv4();
      const userId: string = uuidv4();
      const newAppConfig: AppConfiguration = new AppConfiguration(userId, [newNoteId])
      localStorage.setItem('appConfiguration', JSON.stringify(newAppConfig));
      setAppConfiguration(newAppConfig);
    }
  }, []);

  function saveNote(): void {
    /* Now, simply get the documentId from localStorage and use it to save the note
       For future updates, we could store multiple document IDs in localstorage but for now, we'll just support one document
       to be saved */
    setIsModalOpen(true);
  }

  function modalContent() {

    if (loading) {
      return <h1>Loading</h1>
    }

    const link = `http://localhost:3000/view?noteId=${appConfiguration?.noteIdList[0]}`;

    return (
     <div className={styles.modalContentContainer}>
       <p>{link}</p>
       <button className={styles.modalContentViewButton} onClick={() => router.push(link)}>View</button>
     </div>
    )

  }

  if(loading || !appConfiguration || !noteDocument) return (<h1>Loading</h1>)

  return (
    <div className={styles.mainContainer}>
      <Header saveNote={saveNote}></Header>
      <Modal isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             children={modalContent()}
      ></Modal>

      <div className={styles.mainMarkdownContainer}>
        <MarkdownInput
          setToken={updateContent}
          noteDocument={noteDocument}
          documentId={appConfiguration?.noteIdList[0]}
          userId={'sam'}
        ></MarkdownInput>
        <MarkdownParser token={noteDocument.content}></MarkdownParser>
      </div>
    </div>
  );
}