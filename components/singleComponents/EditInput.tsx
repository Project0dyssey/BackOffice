interface Input4editProps {
    productInfo: any
    handleChange: Function
    property: string
    label: string
}

interface productInfotype {
    productName: string
    productNameEng: string
    descriptionPt: string
    descriptionEng: string
    imgUrl: string
    smallImgs: Array<string>
    category: string
    collection: string
}

export function Input4edit({ productInfo, handleChange, property, label }: Input4editProps) {
    return (
        <div className="flex justify-between gap-2">
            <p className="text-white">{label}</p>
            <input type='text'
                value={productInfo[property]}
                onChange={(event) => handleChange(event.target.value, property)}
            />
        </div>
    )
}