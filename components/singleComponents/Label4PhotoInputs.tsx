interface labelProps{
    description: string
    inputId: string
}

export function Label4Photos({description, inputId}: labelProps){
    return(
        <label className="flex items-center justify-center bg-stone-950 border-stone-600 border-[1px] w-32 h-11 rounded-lg text-center text-[0.85rem] hover:bg-stone-500 hover:text-stone-900 text-stone-200 hover:border-stone-950 cursor-pointer"
        htmlFor={inputId}>{description}</label>
    )
}