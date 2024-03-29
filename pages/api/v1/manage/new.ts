import { AddNewProduct } from "@/mongodb/crud";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        try{
            const {piece} = req.body
            const added = await AddNewProduct(piece)
            return res.status(201).json({result: added})
        } catch(err){

        }
    }
    return res.status(400).json({result: 'Bad Request'})
}