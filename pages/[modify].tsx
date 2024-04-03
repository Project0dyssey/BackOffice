import { Input4edit } from "@/components/singleComponents/EditInput"
import { Label4Photos } from "@/components/singleComponents/Label4PhotoInputs"
import { TextArea4Edit } from "@/components/singleComponents/TextAreaInput"
import { SubmitButton } from "@/components/singleComponents/submitButton"
import { GetToken } from "@/logic/frontend/auth"
import { GetProduct, ModifyProduct } from "@/logic/frontend/fetchs"
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
export default function Modify() {
    const [productInfo, setProductInfo] = useState<productObj>()
    const router = useRouter()

    useEffect(() => {
        async function getLoggedIn() {
            const getToken = await GetToken()
            if (!getToken) return router.push('/')

            const productId = router.query.modify ? router.query.modify : productInfo?._id
            if (typeof productId === 'string') {
                const product = await GetProduct(productId)
                setProductInfo(product)
            }
        }
        getLoggedIn()
    }, [])

    function handleChange(event: any, property: string) {
        setProductInfo((prev: any) => ({ ...prev, [property]: event }))
    }

    function handleChangeImage(event: any) {
        setProductInfo((prev: any) => ({ ...prev, imgUrl: URL.createObjectURL(event) }))
    }

    function handleChangeSmallImages(event: any, i: number) {
        setProductInfo((prev: any) => ({ ...prev, smallImgs: prev.smallImgs.map((el: string, idx: number) => i === idx ? URL.createObjectURL(event) : el) }))
    }

    return (<>
        {typeof productInfo === 'string' ?
            <h1>Ocorreu um erro, tenta de novo</h1> :
            productInfo &&
            <div className="flex flex-col items-center">
                <div className="flex gap-2 text-[1.5rem]">
                    <p className="flex text-yellow-400">E<p className="text-white">ditar</p></p><p className="flex text-yellow-400">P<p className="text-white">eça</p></p>
                </div>
                <div className="w-[100%] flex flex-col gap-4 items-center mt-8">
                    <div className="flex flex-col gap-2">
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
                    </div>
                    <div className="flex flex-col gap-2">
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
                    <div className="flex flex-col items-center gap-5">
                        <div className="flex flex-col items-center gap-2">
                            <img className="h-32" src={productInfo?.imgUrl} />
                            <Label4Photos inputId="principal_photo" description="Trocar foto principal" />
                            <input className="hidden" id="principal_photo" type="file" onChange={(event) => handleChangeImage(event.target.files?.[0])} />
                        </div>
                        <div className="flex justify-center">
                            {productInfo?.smallImgs.map((el: string, i: number) =>
                                <div className="flex flex-col w-52 items-center gap-2">
                                    <img key={i} className="h-36" src={el} />
                                    <Label4Photos inputId={`foto_${i}`} description={`Trocar Foto ${i + 1}`} />
                                    <input className="hidden" id={`foto_${i}`} type="file" onChange={(event) => handleChangeSmallImages(event.target.files?.[0], i)} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-[90%]">
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
                    <div className="p-4">
                        <SubmitButton
                            page="modify"
                            buttonDescription="Submeter"
                            productInfo={productInfo}
                        />
                    </div>
                </div>
            </div>}

    </>)
}