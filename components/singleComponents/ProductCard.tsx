import { ToastElement } from "@/logic/frontend/notifications"
import { notifyToast } from "@/logic/frontend/notify"
import { useRouter } from "next/router"
import { useState } from "react"

interface productProps {
    productInfo: productInfoType
}

interface productInfoType {
    _id: string
    category: string
    collection: string
    descriptionPt: string
    descriptionEng: string
    imgUrl: string
    smallImgs: Array<string>
    productName: string
    productNameEng: string

}

export function ProductCard({ productInfo }: productProps) {
    const [showDropDown, setShowDropDown] = useState<Boolean>(false)
    const router = useRouter()

    function toEditPage(productInfo: productInfoType) {
        return router.push(`/${productInfo._id}`)
    }

   async function deleteProduct(productId: string){
        const options = {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        }

        const res = await fetch(`/api/v1/manage/delete?id=${productId}`, options)
        if(res.status === 200) {
             notifyToast('Peça eliminada com sucesso!', true)
             setTimeout(() => router.reload(), 2000)
        } else {
            notifyToast('Ocorreu um erro.', false)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center h-20 w-5/6">
                <div className="flex justify-around items-center bg-white text-[0.7rem] p-2 rounded-t-lg">
                    <div className="flex flex-col justify-center">
                        <p><strong>Nome:</strong></p>
                        <p>{productInfo.productName}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p><strong>Categoria:</strong></p>
                        <p>{productInfo.category}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p><strong>Colecção:</strong></p>
                        <p>{productInfo.collection}</p>
                    </div>
                    <button onClick={() => setShowDropDown(!showDropDown)}>{showDropDown ? '🔺' : '🔻'}</button>
                </div>
                {showDropDown &&
                    <div className="bg-white text-sm flex justify-evenly text-[0.7rem]">
                        <button onClick={() => deleteProduct(productInfo._id)}>❌ eliminar</button>
                        <button onClick={() => toEditPage(productInfo)}>✏️ editar</button>
                    </div>
                }
                <ToastElement/>
            </div>
        </>
    )
}