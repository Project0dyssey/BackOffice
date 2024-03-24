import { login } from "@/logic/frontend/auth"
import { useRouter } from "next/router"

interface buttonTypes {
    buttonDescription: string
    page: string
    userInfo: any
}

export function SubmitButton({ buttonDescription, page, userInfo }: buttonTypes) {
    const router = useRouter()

    async function submit(page: string) {
        if (page = 'login') {
            const userLogIn = await login(userInfo)
            if (!userLogIn) return 'Metermos um popup login não autorizado'
            router.push('./products')
        }
    }

    return (
        <>
            <button
                className="bg-yellow-950 w-20 border-black border-[1px] rounded-md"
                onClick={() => submit(page)}
            >{buttonDescription}</button>
        </>
    )
}