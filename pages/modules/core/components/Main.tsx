import { useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';
import Header from './Header';
import usePostRequest from '../hooks/usePost';
import { Note } from '../../../../types/noteType';
import { SaveNoteResponse } from '../type/saveNote';


export default function Main(): JSX.Element {

  const [token, setToken] = useState<string>('');
  const { postData, data, error, loading: saveNoteLoading }
    = usePostRequest<SaveNoteResponse>('/api/noteshare');


  function saveNote(): void {
    if (!token) return;

    const body: Note = new Note(
      'test',
      token,
      token.split('\n').length
    );

    postData(body).then((saveNoteRes: SaveNoteResponse): void => {
      console.log(`http://localhost:3000/api/noteshare/${saveNoteRes?.insertedId}`)
    })
  }

  return (
    <div className="main-container">
      <Header saveNote={saveNote}></Header>

      <div className="main-markdown-container">
        <MarkdownInput setToken={setToken}></MarkdownInput>
        <MarkdownParser token={token}></MarkdownParser>
      </div>
    </div>
  );
}