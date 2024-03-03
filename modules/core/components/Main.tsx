import React, { useEffect, useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';
import Header from './Header';
import { NoteDocument } from '../type/saveNote';
import Modal from './Modal';
import styles from './core.module.css';
import { NextRouter, useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../../configurations/fireabseConfig';
import { AppConfiguration } from '../type/appConfiguration';
import { exampleMarkdown } from '../../../data/markdown';

export default function Main(): React.JSX.Element {

  const [noteDocument, setNoteDocument] = useState<NoteDocument>({content: exampleMarkdown, ownerId: ''});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [appConfiguration, setAppConfiguration] = useState<AppConfiguration | null>(null);
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
        console.warn(errMsg);
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

  function modalContent(): React.JSX.Element {
    if (loading) {
      return <h1>Loading</h1>
    }

    const baseURL: string = typeof window !== 'undefined' ? window.location.origin : '';
    const link: string = `${baseURL}/app/view?noteId=${appConfiguration?.noteIdList[0]}`;

    return (
     <div className={styles.modalContentContainer}>
       <p className={styles.modalContentLink}>{link}</p>
       <a className={styles.modalContentViewButton} href={link} target="_blank">View</a>
     </div>
    )

  }

  if (loading || !appConfiguration || !noteDocument) return <h1>Loading</h1>

  return (
    <div className={styles.mainContainer}>
      <Header saveNote={() => setIsModalOpen(true)}></Header>
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
        <MarkdownParser halfWidth={true} token={noteDocument.content}></MarkdownParser>
      </div>
    </div>
  );
}