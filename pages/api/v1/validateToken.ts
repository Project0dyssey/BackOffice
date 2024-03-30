import { NextApiRequest, NextApiResponse } from "next";
import { promisify } from "util";
const jwt = require('jsonwebtoken')

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET'){
        const token = JSON.parse(req.headers.authorization?.split(' ')[1]!)
        try{
            const decoded = await promisify (jwt.verify)(token, process.env.JWT_SECRET)
  
            if(new Date(decoded.exp * 1000) < new Date(Date.now()) || !decoded) return res.status(401).json({result: 'Token expired.'})

            return res.status(200).json({result: 'ola'})
        } catch(err){
            return res.status(400).json({result: err})
        }
    }
}