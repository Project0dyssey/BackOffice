import { FilterProducts } from "@/mongodb/curd";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        if(req.method === 'POST'){

            const {category, collection} = req.body
        
            const getProducts: Array<object> = await FilterProducts(category, collection)
        
            res.status(200).json({result: getProducts})
        }
    } catch(err){
        res.status(400).json({result: 'Bad request'})
    }
}