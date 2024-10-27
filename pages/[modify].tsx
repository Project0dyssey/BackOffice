import { Input4edit } from "@/components/singleComponents/EditInput"
import { Label4Photos } from "@/components/singleComponents/Label4PhotoInputs"
import { TextArea4Edit } from "@/components/singleComponents/TextAreaInput"
import { SubmitButton } from "@/components/singleComponents/submitButton"
import { GetToken } from "@/logic/frontend/auth"
import { GetProduct } from "@/logic/frontend/fetchs"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface productObj {
    _id: string
    productName: string
    productNameEng: string
    descriptionPt: string
    descriptionEng: string
    imgUrl: string
    smallImgs: Array<string>
    category: string
    collection: string
}

const inicialProduct = {
    _id: '',
    productName: '',
    productNameEng: '',
    descriptionPt: '',
    descriptionEng: '',
    imgUrl: '',
    smallImgs: ['1', '2', '3', '4'],
    category: '',
    collection: '',
}
export default function Modify() {
    const [productInfo, setProductInfo] = useState<productObj>()
    const [savePhotos, setSavePhotos] = useState({ photoPrincial: '', otherPhotos: [] })
    const [page, setPage] = useState<string>()
    const router = useRouter()
    const productId = router.query.modify ? router.query.modify : productInfo?._id

    useEffect(() => {
        async function getLoggedIn() {
            const getToken = await GetToken()
            if (!getToken) return router.push('/')

            if (typeof productId === 'string' && productId !== 'addProduct') {
                const product = await GetProduct(productId)
                setProductInfo(product)
            } else {
                setProductInfo(inicialProduct)
                setPage('addProduct')
            }
        }
        getLoggedIn()
    }, [productId])

    function handleChange(event: string, property: string) {
        setProductInfo((prev: any) => ({ ...prev, [property]: event }))
    }

    function handleChangeImage(event: any) {
        setSavePhotos((prev: any) => ({ ...prev, photoPrincipal: event }))
        setProductInfo((prev: any) => ({ ...prev, imgUrl: event ? URL.createObjectURL(event) : prev.imgUrl }))
    }

    function handleChangeSmallImages(event: any, i: number) {
        setSavePhotos((prev: any) => ({ ...prev, otherPhotos: [...prev.otherPhotos, event] }))
        setProductInfo((prev: any) => ({ ...prev, smallImgs: prev.smallImgs.map((el: string, idx: number) => (i === idx && event) ? URL.createObjectURL(event) : el) }))
    }
    return ( <>
        {typeof productInfo === 'string' ? (
            <h1 className="text-red-500 text-center mt-4">Ocorreu um erro, tenta de novo</h1>
        ) : productInfo && (
            <div className="flex flex-col gap-5 items-center bg-stone-800 p-6 rounded-lg w-4/5 mx-auto mt-6 shadow-md">
                <div className="flex gap-2 text-2xl font-semibold text-yellow-400 mb-4">
                    {page !== 'addProduct' ? (
                        <>
                            <p className="text-yellow-400">Editar</p>
                            <p className="text-stone-200">Peça</p>
                        </>
                    ) : (
                        <>
                            <p className="text-yellow-400">Adicionar</p>
                            <p className="text-stone-200">Peça</p>
                        </>
                    )}
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input4edit
                            productInfo={productInfo}
                            handleChange={handleChange}
                            property="productName"
                            label="Nome em PT:"
                        />
                        <Input4edit
                            productInfo={productInfo}
                            handleChange={handleChange}
                            property="productNameEng"
                            label="Nome em Eng:"
                        />
                        <Input4edit
                            productInfo={productInfo}
                            handleChange={handleChange}
                            property="category"
                            label="Categoria:"
                        />
                        <Input4edit
                            productInfo={productInfo}
                            handleChange={handleChange}
                            property="collection"
                            label="Coleção:"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-6 mt-4">
                        <div className="flex flex-col items-center gap-2">
                            <img className="h-32 w-32 rounded-lg object-cover" src={productInfo?.imgUrl} />
                            <Label4Photos inputId="principal_photo" description={page !== 'addProduct' ? 'Trocar foto principal' : 'Adicionar Foto Principal'} />
                            <input className="hidden" id="principal_photo" type="file" onChange={(event) => handleChangeImage(event.target.files?.[0])} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {productInfo?.smallImgs.map((el: string, i: number) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <img className="h-24 w-24 rounded-lg object-cover" src={el} />
                                    <Label4Photos inputId={`foto_${i}`} description={page !== 'addProduct' ? `Trocar Foto ${i + 1}` : `Adicionar Foto ${i + 1}`} />
                                    <input className="hidden" id={`foto_${i}`} type="file" onChange={(event) => handleChangeSmallImages(event.target.files?.[0], i)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-4 mt-4">
                        <TextArea4Edit
                            productInfo={productInfo}
                            handleChange={handleChange}
                            property="descriptionPt"
                            label="Descrição em PT:"
                        />
                        <TextArea4Edit
                            productInfo={productInfo}
                            handleChange={handleChange}
                            property="descriptionEng"
                            label="Descrição em Eng:"
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <SubmitButton
                            page={page === 'addProduct' ? 'addProduct' : 'modify'}
                            buttonDescription="Submeter"
                            savedPhotos={savePhotos}
                            productInfo={productInfo}
                        />
                    </div>
                </div>
            </div>
        )}
    </>
);
}