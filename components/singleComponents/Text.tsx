interface textType {
    text: string
}

export function Text({ text }: textType) {
    return (
        <>
            <p className={`text-stone-400 font-thin text-[0.6rem] ${text.startsWith('Log') ? 'text-[3rem]' : ''}`}>{text}</p>
        </>
    )
}