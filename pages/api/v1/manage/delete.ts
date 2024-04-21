import { DeleteProduct } from "@/mongodb/crud";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'DELETE'){
        try{
            const {id} = req.query
            if(typeof id === 'string'){
                const deleted = await DeleteProduct(id)
  
           return res.status(200).json({result: deleted})
            }
        } catch(err){
           return res.status(400).json({result: 'Bad Request'})
        }
    }
    return res.status(400).json({result: 'Bad Request'})
}