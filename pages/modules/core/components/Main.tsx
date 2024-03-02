import { useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';

export default function Main(): JSX.Element {

  const [token, setToken] = useState<string>('');


  return (
    <>
       <MarkdownInput setToken={setToken}></MarkdownInput>
      <MarkdownParser token={token}></MarkdownParser>
    </>
  );
}