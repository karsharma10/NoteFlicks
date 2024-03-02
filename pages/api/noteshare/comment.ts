import clientPromise from "../../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;

    if(method == "POST"){
        try {
            const client = await clientPromise;
            const db = client.db("NoteFlixDb");
            
        }catch (e){

        }
    } else{
        res.status(401).json({message: "API request " + method + " not allowed"});
    }

}