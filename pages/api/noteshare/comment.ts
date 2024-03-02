import clientPromise from "../../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import {databaseName} from "../../../config/databaseConfig";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;

    if(method == "POST"){
        try {
            const client = await clientPromise;
            const db = client.db(databaseName);

        }catch (e){

        }
    } else{
        res.status(401).json({message: "API request " + method + " not allowed"});
    }

}