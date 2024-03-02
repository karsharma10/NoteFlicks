import {type} from "node:os";
import {comment} from "./comment"
import {List} from "postcss/lib/list";

export type Note = {
    title: String
    content: String
    totalLines: number
    comments: comment[]
}