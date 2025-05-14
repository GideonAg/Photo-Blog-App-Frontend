import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight">ImageHub</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-blue-200 transition-colors">Dashboard</Link>
                    <Link to="/upload" className="hover:text-blue-200 transition-colors">Upload Image</Link>
                    <Link to="/recycle-bin" className="hover:text-blue-200 transition-colors">Recycle Bin</Link>
                    <button
                        onClick={() => {
                            // Replace with actual logout logic
                            alert("Logged out!");
                            navigate("/");
                        }}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar