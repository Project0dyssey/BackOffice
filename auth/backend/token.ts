import { NextApiRequest, NextApiResponse } from "next";
import { promisify } from "util";
const jwt = require('jsonwebtoken')

export async function validateToken(req: NextApiRequest){
        try{
            const token = req.headers.authorization?.split(' ')[1]
             const validateToken = await promisify (jwt.verify)(token, process.env.JWT_SECRET)
             console.log(validateToken)
            return true
        } catch(err){
            return false
        }
    }
