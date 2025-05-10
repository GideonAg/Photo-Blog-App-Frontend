import { ReactNode } from "react"


function Layout({ children}: {children:ReactNode}) {
    return (
        <>
            <div className="flex w-full h-full bg-red-500 p-10">
                {children}
            </div>
        </>
    )
}

export default Layout