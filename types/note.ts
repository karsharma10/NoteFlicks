import {type} from "node:os";
import {comment} from "./comment"

export type Note = {
    title: String
    content: String
    totalLines: number
    comments: comment[]
}