import Main from '../../modules/core/components/Main';
import React from 'react';

export default function Home(): React.JSX.Element {

  return (
    <>
      <Main></Main>
      <style jsx global>{`
        body {
          font-size: 14px;
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
        tr {
          border-top: 1px solid #c6cbd1;
          background: #fff;
        }
        th,
        td {
          padding: 6px 13px;
          border: 1px solid #dfe2e5;
        }

        table tr:nth-child(2n) {
          background: #f6f8fa;
        }
      `}</style>
    </>
  );
}
