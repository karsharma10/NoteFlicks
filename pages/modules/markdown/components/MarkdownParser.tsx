import { markdownParserProps } from '../types/markdownParser';

export default function MarkdownParser({ token }: markdownParserProps): JSX.Element {

  return (
    <h2>{ token }</h2>
  )
}