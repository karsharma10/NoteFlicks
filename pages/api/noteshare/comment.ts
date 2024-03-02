import clientPromise from "../../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import {databaseName} from "../../../config/databaseConfig";
import {comment} from "../../../types/comment";
import {ObjectId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;

    if (method === "POST") {
        try {
            const id = new ObjectId(req.body.noteId);
            const client = await clientPromise;
            const db = client.db(databaseName);

            if (req.body.noteId == null || req.body.createdBy == null || req.body.comment == null || req.body.date == null || req.body.commentStartLine == null || req.body.commentEndLine == null) { //one of the field values are empty
                res.status(400).json({message: "field value is empty"});
            }

            const newComment: comment = {
                createdBy: req.body.createdBy,
                comment: req.body.comment,
                date: req.body.date,
                commentStartLine: req.body.commentStartLine,
                commentEndLine: req.body.commentEndLine
            }

            const add_comment = await db.collection(databaseName).updateOne(
                {"_id": id},
                {$push: {"comments": newComment}},
                {upsert: false}
            );

            res.json(add_comment);

        } catch (e) {
            res.status(400).json({message: "comment update failed"});
        }
    } else {
        res.status(401).json({message: "API request " + method + " not allowed"});
    }

}