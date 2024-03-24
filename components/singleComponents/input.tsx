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

    function handleChange(event: any, type: string) {
        setUserInfo((prev: stateType) => ({ ...prev, [type]: event }))
    }
    return (
        <>
            <input
                value={userInfo[type]}
                type={type}
                placeholder={description}
                onChange={(event) => handleChange(event.target.value, type)}
                className="text-black w-[14rem] h-[2rem] rounded-lg text-center"
            />
        </>
    )
}