import { login } from "@/logic/frontend/auth";
import { ModifyProduct } from "@/logic/frontend/fetchs";
import { ToastElement } from "@/logic/frontend/notifications";
import { notifyToast } from "@/logic/frontend/notify";
import { useRouter } from "next/router";
import { useState } from "react";

interface buttonTypes {
    buttonDescription: string;
    page: string;
    userInfo?: any;
    productInfo?: any;
    savedPhotos?: any;
}

export function SubmitButton({ buttonDescription, page, userInfo, productInfo, savedPhotos }: buttonTypes) {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    async function submit(page: string) {
        if (page === 'login') {
            const userLogIn = await login(userInfo);
            if (!userLogIn) return notifyToast('Log in incorreto', false);

            notifyToast('Log in com sucesso!', true);
            setTimeout(() => {
                router.push('./products');
            }, 2300);
        } else if (page === 'modify' || page === 'addProduct') { // Corrigido para verificar corretamente
            const modifyProduct = await ModifyProduct(productInfo, savedPhotos, page);
            if (!modifyProduct) return notifyToast('Ocorreu um erro, tenta novamente', false);

            page === 'modify' 
                ? notifyToast('Peça modificada com sucesso!', true) 
                : notifyToast('Peça criada com sucesso!', true);
            setTimeout(() => page === 'addProduct' && router.reload(), 2500);
        }
    }

    return (
        <>
            <button
           className={`relative inline-flex items-center justify-center w-32 h-10 text-lg font-semibold border border-transparent rounded-lg duration-200 
                  ${isActive ? 'text-white' : 'text-stone-400 hover:bg-stone-950'} 
                    border-2  border-stone-300 transition ease-in-out
                    before:absolute before:inset-0 before:bg-transparent before:border-2 before:border-transparent 
                    hover:text-stone-300 hover:outline-none
                    hover:before:border-stone-900
                  `}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                onClick={() => submit(page)}
            >
                {buttonDescription}
            </button>
            <ToastElement />
        </>
    );
}
