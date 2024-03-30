import { CheckBox } from "@/components/singleComponents/CheckBox"
import { ProductCard } from "@/components/singleComponents/ProductCard"
import { SearchInputs } from "@/components/singleComponents/SearchInputs"
import { GetToken } from "@/logic/frontend/auth"
import { products } from "@/logic/frontend/fetchs"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


interface filterType {
    category: string
    collection: Array<string>
}

interface product {
    name: string
    nameEng: string
}

export default function Products() {
    const [filter, setFilter] = useState<filterType>({ category: 'All', collection: [] })
    const [product, setProduct] = useState<Array<product>>([{ name: '', nameEng: '' }])
    const router = useRouter()

    useEffect(() => {
        async function getLoggedIn() {
            const getToken = await GetToken()
            if (!getToken) return router.push('/')

            const fetchProducts = await products(filter)
            setProduct(fetchProducts)
        }
        getLoggedIn()
    }, [filter])
    console.log(filter)
    return (
        <div className="flex flex-col gap-5 h-dvh items-center overflow-scroll">
            <div className="flex mt-2 text-[1.3rem]">
                <p className="text-yellow-500">P</p><p className="text-white">rodutos</p>
            </div>
            <SearchInputs setFilter={setFilter}/>
            <div className="w-[100%] flex flex-col items-center p-5">
                {product.map((el: any, i: number) =>
                    <div key={i} className="w-[100%] flex justify-center">
                        <ProductCard productInfo={el} />
                    </div>
                )}
            </div>
        </div>
    )
}