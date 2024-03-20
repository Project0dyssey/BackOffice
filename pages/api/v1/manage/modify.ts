import { ModifyProduct } from "@/mongodb/curd";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        try{
            const {modifedProduct} = req.body
            
            const modifed = await ModifyProduct(modifedProduct)
            
            res.status(200).json({result: modifed})
        } catch(err){
            res.status(400).json({result: 'Something went wrong'})
        }
    }
        res.status(400).json({result: 'Bad Request'})
}