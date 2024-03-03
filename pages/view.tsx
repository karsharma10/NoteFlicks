import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../configurations/fireabseConfig';
import { Unsubscribe } from '@firebase/util';
import MarkdownParser from './modules/markdown/components/MarkdownParser';

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
    <div>
      <MarkdownParser token={documentContent} />
    </div>
  );
}