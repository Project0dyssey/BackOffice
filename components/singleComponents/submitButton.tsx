import { login } from "@/logic/frontend/auth"
import { ModifyProduct } from "@/logic/frontend/fetchs"
import { ToastElement } from "@/logic/frontend/notifications"
import { notifyToast } from "@/logic/frontend/notify"
import { useRouter } from "next/router"
import { useState } from "react"

interface buttonTypes {
    buttonDescription: string
    page: string
    userInfo?: any
    productInfo?: any
    savedPhotos?: any
}

export function SubmitButton({ buttonDescription, page, userInfo, productInfo, savedPhotos }: buttonTypes) {
    const router = useRouter()
    const [isActive, setIsActive] = useState(false);

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
        className={`relative inline-flex items-center justify-center w-20 opacity-90
          ${isActive ? 'text-stone-950 border-[1px]' : 'text-black border-black'}
          bg-yellow-950 border-1 rounded-md duration-500 pause`}
        onMouseDown={() => setIsActive(true)} 
        onMouseUp={() => setIsActive(false)}
        onClick={() => submit(page)}
      >
        {buttonDescription}
      </button>
            <ToastElement />
        </>
    )
}