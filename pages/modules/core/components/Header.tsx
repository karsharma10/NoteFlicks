export default function Header({ saveNote }: any): JSX.Element {

  return (
    <div className="header-container">
      <p className="header-title">NoteFlicks</p>
      <button onClick={() => saveNote()} className="header-share-button">Share</button>
    </div>
  );
}