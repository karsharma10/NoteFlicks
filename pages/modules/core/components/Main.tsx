import { useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';
import Header from './Header';
import usePostRequest from '../hooks/usePost';
import { Note } from '../../../../types/noteType';
import { SaveNoteResponse } from '../type/saveNote';
import Modal from './Modal';


export default function Main(): JSX.Element {

  const [token, setToken] = useState<string>('');
  const { postData, error, loading: saveNoteLoading }
    = usePostRequest<SaveNoteResponse>('/api/noteshare');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [saveNoteRes, setSaveNoteRes] = useState<SaveNoteResponse | null>(null);


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

    return (
      <p>{`http://localhost:3000/api/noteshare/${saveNoteRes?.insertedId}`}</p>
    )
  }

  return (
    <div className="main-container">
      <Header saveNote={saveNote}></Header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} children={modalContent()}></Modal>

      <div className="main-markdown-container">
        <MarkdownInput setToken={setToken}></MarkdownInput>
        <MarkdownParser token={token}></MarkdownParser>
      </div>
    </div>
  );
}