import { useState } from 'react';
import MarkdownInput from '../../markdown/components/MarkdownInput';
import MarkdownParser from '../../markdown/components/MarkdownParser';

export enum MarkdownState{
  paragraph = 0,
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,

  bold,
  italic,
  strikethrough,

  backtick,
  code,
  codeblock,

};



export default function Main(): JSX.Element {

  const [token, setToken] = useState<string>('');
  const [currentState, setCurrentState] = useState(MarkdownState.paragraph);


  return (
    <>
       <MarkdownInput setToken={setToken}></MarkdownInput>
      <MarkdownParser token={token} mdState={ currentState } setMdSate={ setCurrentState }></MarkdownParser>
    </>
  );
}