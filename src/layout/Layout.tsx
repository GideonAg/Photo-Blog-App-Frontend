import { ReactNode } from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivateRoute from "../components/pages/auth/PrivateRoute";


function Layout({ children}: {children:ReactNode}) {
    return (
        <PrivateRoute>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />
                <main className="flex-grow container mx-auto p-6">{children}</main>
                <Footer />
            </div>
        </PrivateRoute>
    );
}

export default Layout