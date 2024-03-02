import clientPromise from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import {NoteType} from "../../types/noteType";
import {databaseName} from "../../config/databaseConfig";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;
    console.log(req.body)

    if (method === "POST") { //Post request to mongodb
        try {
            const client = await clientPromise;
            const db = client.db(databaseName);

            if (req.body.title == null || req.body.content == null || req.body.totalLines == null) { //one of the field values are empty
                res.status(400).json({message: "field value is empty"});
            }

            const uploadNote: NoteType = { //create note type
                title: req.body.title,
                content: req.body.content,
                totalLines: req.body.totalLines,
                comments: []
            }
            let post_note = await db.collection(databaseName).insertOne(uploadNote);
            res.json(post_note);

        } catch (e) {
            res.status(400).json({message: "failed to post new note to the database"});
        }
    } else {
        res.status(401).json({message: "API request " + method + " not allowed"});
    }

}