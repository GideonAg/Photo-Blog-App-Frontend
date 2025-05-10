function Pagination({ currentPage, totalPages, onPageChange }:{currentPage:number, totalPages:number, onPageChange:(val:number) => void}) {


    
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex justify-center space-x-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
            >
                Previous
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-full ${
                        page === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination