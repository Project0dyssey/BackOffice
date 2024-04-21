import { AddNewProduct, ModifyProduct } from "@/mongodb/crud";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        try{
            if(!req.body._id){
                delete req.body._id
                const created = await AddNewProduct(req.body)
                return res.status(200).json({result: created})
            }
            const modifed = await ModifyProduct(req.body)
            res.status(200).json({result: modifed})
        } catch(err){
            res.status(400).json({result: 'Something went wrong'})
        }
    }
        res.status(400).json({result: 'Bad Request'})
}