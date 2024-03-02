import MarkdownParser from './modules/markdown/components/MarkdownParser';
import Main from './modules/core/components/Main';

export default function Home(): JSX.Element {
  return (
   <>
     <MarkdownParser token={"alii"}></MarkdownParser>
     <Main></Main>
   </>
  );
}
