import React, { Dispatch, SetStateAction } from 'react';

export default function MarkdownInput({ setToken }: { setToken: Dispatch<SetStateAction<string>>} ): JSX.Element {
  

  return (
    <input
      onChange={(e) => setToken(e.target.value)}
      type="text" placeholder="Enter your markdown here"
    />
  );
}