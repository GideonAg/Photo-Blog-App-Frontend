import { ReactNode } from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Layout({ children}: {children:ReactNode}) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-grow container mx-auto p-6">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout