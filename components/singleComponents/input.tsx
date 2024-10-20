import { useState } from "react"

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
    
    const [isFocused, setIsFocused] = useState(false); 

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
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)}
                className={`text-white w-[20rem] h-[2rem] rounded-lg text-center text-[0.9rem] border-[1px] 
                ${isFocused ? 'border-stone-600 bg-stone-900' : 'border-black bg-stone-800'} outline-none bg-opacity-150`}
            />
        </>
    )
}