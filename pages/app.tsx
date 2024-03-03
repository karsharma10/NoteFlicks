import Main from './modules/core/components/Main';
// import '../styles/globals.css';
// import './modules/core/components/core.module.css';
// import './modules/markdown/components/markdown.module.css';
import React from 'react';

export default function Home(): React.JSX.Element {

  return (
    <>
      <Main></Main>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        p {
          margin: 0;
        }
      `}</style>
    </>
  );
}
