import { useRouter } from "next/router"

interface buttonType {
    path: string
    description: string
}

export function RouteButton({ path, description }: buttonType) {
    const router = useRouter()
    return (
        <>
            <button className="bg-gray-600 text-white p-2 rounded-xl"
                onClick={() => { router.push(path); description === 'Log out' && localStorage.removeItem('token') }}>
                {description}
            </button>
        </>
    )
}