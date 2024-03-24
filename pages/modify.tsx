import { GetToken } from "@/logic/frontend/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Modify() {
    const router = useRouter()
    useEffect(() => {
        async function getLoggedIn() {
            const getToken = await GetToken()
            if (!getToken) return router.push('/')
        }
        getLoggedIn()
    }, [])
    return (<>
               Modificar peça 
            </>)
}