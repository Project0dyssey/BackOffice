import { Navbar } from "./singleComponents/Navbar";

export function Layout({ children }: any) {
    return (
        <div className="flex">
            <Navbar />
            <main className="w-dvw h-dvh bg-yellow-800">{children}</main>
        </div>
    )
}