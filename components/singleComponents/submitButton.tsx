import { login } from "@/logic/frontend/auth"
import { ModifyProduct } from "@/logic/frontend/fetchs"
import { ToastElement } from "@/logic/frontend/notifications"
import { notifyToast } from "@/logic/frontend/notify"
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

            if (!userLogIn) return notifyToast('Log in incorreto', false)

            notifyToast('Log in com sucesso!', true)
            setTimeout(() => {
                router.push('./products')
            }, 2300)
        } else if (page === 'modify' || 'addProduct') {
            const modifyProduct = await ModifyProduct(productInfo, savedPhotos, page)

            if (!modifyProduct) return notifyToast('Ocorreu um erro, tenta novamente', false)

            page === 'modify' ? notifyToast('Peça modificada com successo!', true) : notifyToast('Peça criada com sucesso!', true)
            return setTimeout(() => page === 'addProduct' && router.reload(), 2500)
        }   
    }
    return (
        <>
            <button
                className="bg-yellow-950 w-20 border-black border-[1px] rounded-md text-white"
                onClick={() => submit(page)}
            >{buttonDescription}</button>
            <ToastElement />
        </>
    )
}