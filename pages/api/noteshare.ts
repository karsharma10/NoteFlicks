import clientPromise from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import {Note} from "../../types/note";
import {comment} from "../../types/comment";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;

    if (method === "POST") { //Post request to mongodb
        try {
            const client = await clientPromise;
            const db = client.db("NoteFlixDb");

            if (req.body.title == null || req.body.content == null || req.body.totalLines == null) { //one of the field values are empty
                res.status(400).json({message: "field value is empty"});
            }

            const uploadNote: Note = { //create note type
                title: req.body.title,
                content: req.body.content,
                totalLines: req.body.totalLines,
                comments: []
            }
            let post_note = await db.collection("NoteFlixDb").insertOne(uploadNote);
            res.json(post_note);

        } catch (e) {
            res.status(400).json({message: "failed to post new note to the database"});
        }
    } else {
        res.status(401).json({message: "API request " + method + " not allowed"});
    }

}