import { Navbar } from "./singleComponents/Navbar";

export function Layout({ children }: any) {
    return (
        <div className="flex">
            <Navbar />
            <main
                className="w-dvw h-dvh bg-[url('/images/background.png')] bg-cover">
                {children}
            </main>
        </div>
    )
}