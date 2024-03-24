import { GetToken } from "@/logic/frontend/auth"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Products() {
    const router = useRouter()

    useEffect(() => {
        async function getLoggedIn() {
            const getToken = await GetToken()
            if (!getToken) return router.push('/')
        }
        getLoggedIn()
    }, [])
    return (
        <div className="flex felx-col justify-center bg-red-400">
            <p className="text-white">Olá</p>
        </div>
    )
}