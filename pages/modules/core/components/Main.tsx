import { useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';

export default function Main(): JSX.Element {

  const [token, setToken] = useState<string>('');


  return (
    <div className="w-screen h-screen flex">
      <MarkdownInput setToken={setToken}></MarkdownInput>
      <MarkdownParser token={token}></MarkdownParser>
    </div>
  );
}