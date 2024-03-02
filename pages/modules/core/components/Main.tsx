import { useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';

export default function Main(): JSX.Element {

  const [token, setToken] = useState<string>('');
  const [currentInput, setCurrentInput] = useState<string>('');


  return (
    <>
       <MarkdownInput setInput={setCurrentInput}></MarkdownInput>
        {currentInput}
    </>
  );
}