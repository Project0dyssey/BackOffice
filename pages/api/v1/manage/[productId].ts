import { GetProductById } from "@/mongodb/crud";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'GET'){
        try{
            const {productId} = req.query
            if(typeof productId === 'string'){
                const product = await GetProductById(productId)
                res.status(200).json({result: product})
            }
        } catch (err){
            res.status(400).json({result: err})
        }
    }

}