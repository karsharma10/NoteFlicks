import {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "../../../lib/mongodb";
import {databaseName} from "../../../configurations/databaseConfig";
import {ObjectId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query;
    const method = req.method;

    if (method === "GET") { //post request
        try{
            const client = await clientPromise;
            const db = client.db(databaseName);
            const id = new ObjectId(slug?.toString()); //convert slug to object id
            console.log(id);
            const getNote = await db.collection(databaseName).find({"_id": id}).toArray();

            res.json(getNote);

        }catch (e){
            res.status(400).json({message: "failed to find note in the database"});
        }
        
    } else{
        res.status(401).json({message: "API request " + method + " not allowed"});
    }
}
