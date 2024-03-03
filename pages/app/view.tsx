import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../configurations/fireabseConfig';
import { Unsubscribe } from '@firebase/util';
import MarkdownParser from '../../modules/markdown/components/MarkdownParser';
import ViewHeader from "../../modules/core/components/ViewHeader";

export default function View(): JSX.Element {
  const searchParams: ReadonlyURLSearchParams = useSearchParams()
  const noteId: string | null = searchParams.get('noteId')
  const [documentContent, setDocumentContent] = useState('');

  useEffect(() => {
    if (noteId) {
      const unsub: Unsubscribe = onSnapshot(doc(db, "notes", noteId), (doc) => {
        if (!doc.exists()) return;
        setDocumentContent(doc.data().content);
      });

      return () => unsub();
    }
  }, [noteId]);

  return (
    <>
      <ViewHeader/>
      <MarkdownParser halfWidth={false} token={documentContent} />
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
      `}</style>
    </>
  );
}