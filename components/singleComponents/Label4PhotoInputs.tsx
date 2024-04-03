interface labelProps{
    description: string
    inputId: string
}

export function Label4Photos({description, inputId}: labelProps){
    return(
        <label className="bg-slate-400 border-black border-[2px] w-32 h-11 rounded-lg text-center text-[0.85rem]" htmlFor={inputId}>{description}</label>
    )
}