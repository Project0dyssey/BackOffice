interface inputTypes {
    type: string
    description: string,
    userInfo: any
    setUserInfo: Function
}

interface stateType {
    email: string
    password: string
}

export function Input({ type, description, userInfo, setUserInfo }: inputTypes) {

    function handleChange(event: string, type: string) {
        setUserInfo((prev: stateType) => ({ ...prev, [type]: event }))
    }
    return (
        <>
            <input
                value={userInfo[type]}
                type={type}
                placeholder={description}
                onChange={(event) => handleChange(event.target.value, type)}
                className="text-black w-[24rem] h-[3rem] rounded-lg text-center text-[1.1rem] border-[1px] border-black outline-none"
            />
        </>
    )
}