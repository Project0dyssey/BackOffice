import { login } from "@/logic/frontend/auth"
import { ModifyProduct } from "@/logic/frontend/fetchs"
import { useRouter } from "next/router"

interface buttonTypes {
    buttonDescription: string
    page: string
    userInfo?: any
    productInfo?: any
    savedPhotos?: any
}

export function SubmitButton({ buttonDescription, page, userInfo, productInfo, savedPhotos }: buttonTypes) {
    const router = useRouter()

    async function submit(page: string) {
        if (page === 'login') {
            const userLogIn = await login(userInfo)
            if (!userLogIn) return 'Metermos um popup login não autorizado'
            router.push('./products')
        } else if (page === 'modify' || 'addProduct') {
            const modifyProduct = await ModifyProduct(productInfo, savedPhotos, page)
            if (modifyProduct) return 'Notificação'
        }
    }

    return (
        <>
            <button
                className="bg-yellow-950 w-20 border-black border-[1px] rounded-md text-white"
                onClick={() => submit(page)}
            >{buttonDescription}</button>
        </>
    )
}