interface CheckBoxProps {
    description: string
    setFilter: Function
    typeC: string
}

export function CheckBox({ description, setFilter, typeC }: CheckBoxProps) {

    function handleChange(event: any, description: string) {
        if (event && (typeC === 'collection')) return setFilter((prev: any) => ({ ...prev, collection: [...prev.collection, description] }))
        if (event && (typeC === 'category')) return setFilter((prev: any) => ({ ...prev, category: description }))
        if (!event && (typeC === 'collection')) return setFilter((prev: any) => ({ ...prev, collection: prev.collection.filter((el: any) => el !== description) }))
        if (!event && (typeC === 'category')) return setFilter((prev: any) => ({ ...prev, category: 'All' }))
    }
    return (
        <div className="flex flex-col">
            <input type="checkbox" value={description} onChange={(event) => handleChange(event.target.checked, description)} />
            <p>{description}</p>
        </div>
    )
}