import { promisify } from "util"
const jwt = require('jsonwebtoken')

interface userInfoType{
    email: string
    password: string
}

export async function login(userInfo: userInfoType){
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userInfo)
    }

    const res = await fetch('/api/v1/login', options)
    if(res.status === 200){
        const body = await res.json()
        localStorage.setItem('token', JSON.stringify(body.result))
        return body.result
    }
    return false
}

export async function GetToken(){
    const token = localStorage.getItem('token')
    if(!token) return false
    const options = {
        method: 'GET',
        headers: {'Authorization': `jwt ${token}`}
    }
    const res = await fetch('/api/v1/validateToken', options)
    if(res.status === 200){
        return true
    }
    return false
}