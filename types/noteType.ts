import {comment} from "./comment"

export type NoteType = {
    title: String
    content: String
    totalLines: number
    comments: comment[]
}

export class Note {
    public title: String;
    public content: String;
    public totalLines: number;
    public comments: comment[];


    constructor(title: String, content: String, totalLines: number, comments: comment[] = []) {
        this.title = title;
        this.content = content;
        this.totalLines = totalLines;
        this.comments = comments;
    }
}