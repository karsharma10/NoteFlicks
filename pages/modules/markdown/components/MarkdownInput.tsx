import React, { Dispatch, SetStateAction } from 'react';

export default function MarkdownInput({ setInput }: { setInput: Dispatch<SetStateAction<string>>} ): JSX.Element {

  return (
    <input
      onChange={(e) => setInput(e.target.value)}
      type="text" placeholder="Enter your markdown here"
    />
  );
}