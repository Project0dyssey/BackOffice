interface TextArea4EditProps {
    productInfo: any
    handleChange: Function
    label: string
    property: string
}

export function TextArea4Edit({ productInfo, handleChange, label, property }: TextArea4EditProps) {
    return (
        <div className="text-center w-[100%]">
            <p className="text-white">{label}</p>
            <textarea
                className="w-[100%] text-sm"
                value={productInfo[property]}
                onChange={(event) => handleChange(event.target.value, property)}
            />
        </div>
    )
}