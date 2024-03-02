import { MarkdownState } from '../../core/components/Main';
import { markdownParserProps } from '../types/markdownParser';

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



class MarkdownElement {
  type: MarkdownState;
  content: string;
  // children: MarkdownElement[];

  constructor(type: MarkdownState, content: string){
    this.type = type;
    this.content = content;
    // this.children = children;
  }
}


export default function MarkdownParser({ token, mdState, setMdSate }: markdownParserProps): JSX.Element {
  return (
    <Markdown remarkPlugins={[remarkGfm]}>{token}</Markdown>
  )
}