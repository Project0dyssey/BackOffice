import { GetUserInfo } from "@/mongodb/curd"
import { ObjectId } from "mongodb"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export async function login(email: string, password: string) {
    const user = await GetUserInfo(email)
    if(!user) return false
    const verifyPw = await bcrypt.compare(password, user.password)
    return await verifyPw ? genJwtToken(user._id) : false
}

 async function genJwtToken(userId: ObjectId) {
    const jwtExpire: string = process.env.JWT_EXPIRES!
    return await jwt.sign({_id: userId}, process.env.JWT_SECRET, {expiresIn: jwtExpire})
}