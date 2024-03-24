import { useRouter } from "next/router"

interface buttonType {
    path: string
    description: string
}
export function RouteButton({ path, description }: buttonType) {
    const router = useRouter()

    function clearLocalStorage() {
        if (description === 'Log out') localStorage.removeItem('token')
            return
    }
    return (
        <>
            <button className="bg-gray-600" onClick={() => { router.push(path); clearLocalStorage() }}>{description}</button>
        </>
    )
}