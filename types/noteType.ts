import {comment} from "./comment"

export type NoteType = {
    title: String
    content: String
    totalLines: number
    comments: comment[]
}
