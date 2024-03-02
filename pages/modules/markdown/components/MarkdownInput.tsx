import React, { Dispatch, SetStateAction } from 'react';

export default function MarkdownInput({ setToken }: { setToken: Dispatch<SetStateAction<string>>} ): JSX.Element {
  

  return (
    <div className="markdown-input-container">
      <textarea
        className="markdown-text-input"
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your markdown here"
      />
    </div>
  );
}