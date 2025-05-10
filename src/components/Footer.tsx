function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-6 mt-auto">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} ImageHub. All rights reserved.</p>
                <div className="mt-2 space-x-4">
                    <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer