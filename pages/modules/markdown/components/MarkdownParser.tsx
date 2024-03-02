import { markdownParserProps } from '../types/markdownParser';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownParser({token}: markdownParserProps): JSX.Element {


  return (
    <div className="max-w-[50%]">
      <Markdown remarkPlugins={[remarkGfm]}>{token}</Markdown>
    </div>
  )
}