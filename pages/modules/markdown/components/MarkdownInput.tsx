import React, { Dispatch, SetStateAction } from 'react';

export default function MarkdownInput({ setToken }: { setToken: Dispatch<SetStateAction<string>>} ): JSX.Element {

  return (
    <div className="w-[50%] h-full">
      <textarea
        className="w-full h-full resize-none"
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your markdown here"
      />
    </div>
  );
}