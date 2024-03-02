import { useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';
import Header from './Header';


export default function Main(): JSX.Element {

  const [token, setToken] = useState<string>('');

  return (
    <div className="main-container">
      <Header></Header>

      <div className="main-markdown-container">
        <MarkdownInput setToken={setToken}></MarkdownInput>
        <MarkdownParser token={token}></MarkdownParser>
      </div>
    </div>
  );
}