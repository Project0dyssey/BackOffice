interface textType {
    text: string
}

export function Text({ text }: textType) {
    return (
        <>
            <p className={`text-white text-[0.6rem] ${text.startsWith('Log') ? 'text-[3rem]' : ''}`}>{text}</p>
        </>
    )
}