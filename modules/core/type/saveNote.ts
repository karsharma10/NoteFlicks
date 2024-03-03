export interface NoteDocument {
  /*
    Plain text representing markdown
  */
  content: string,

  /*
    The id of the user who created the note.
    Acts as a private key of the note. This is currently stored in local storage to bypass authentication.
    Ideally it should be stored in database however it will require authentication.
  */
  ownerId: string,
}