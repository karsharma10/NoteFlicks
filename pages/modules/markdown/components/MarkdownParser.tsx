import { markdownParserProps } from '../types/markdownParser';

export default function MarkdownParser({token}: markdownParserProps): JSX.Element {


  return (
    <div className="markdown-parser-container">
      <h2 className="text-3xl font-bold underline">{token}</h2>
    </div>
  )
}