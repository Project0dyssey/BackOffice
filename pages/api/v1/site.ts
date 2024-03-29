import { FilterProducts } from "@/mongodb/crud";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors"

export default async(req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200
     })

    const {category, collection} = req.body
    
        try {
            const result = await FilterProducts(category, collection)
            res.status(200).json({result: result})
        } catch (error) {
            res.status(400).json({result: 'Error'})
        }
}