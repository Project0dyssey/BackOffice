import { Logo } from "./Logo"
import { Text } from "./Text"
import { RouteButton } from "./routeButtons"

export function Navbar() {
    return (
        <>
            <div className="bg-stone-950 w-30 flex flex-col justify-between p-3">
                <div className="flex flex-col items-center">
                    <Logo />
                    <Text text="Organic Mean" />
                    <Text text="Back Office" />
                </div>
                <div className="flex flex-col gap-4">
                    <RouteButton path='./products' description='Produtos' />
                    <RouteButton path='./addProduct' description='Adicionar' />
                </div>
                <div>
            
                    <RouteButton path="/" description="Log out" />
                </div>
            </div>
        </>
    )
}