export type SaveNoteResponse = {
  acknowledged: boolean
  insertedId: string
}


export interface NoteDocument {
  content: string,
  ownerId: string,
}