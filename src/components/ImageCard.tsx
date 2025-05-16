import { FaShareAlt, FaTrash, FaUndo } from "react-icons/fa";

interface Image {
    id: string;
    src: string;
    alt: string;
}

interface ImageCardProps {
    image: Image;
    onDelete: (image: Image) => void;
    onSecondaryAction: (image: Image) => void;
    onClick: (image: Image) => void;
    onPermanentlyDelete?: (image: Image) => void;
    isRecycleBin?: boolean;
    isSharing?: boolean;
    isDeleting?: boolean;
    isRestoring?: boolean;
    isPermanentlyDeleting?: boolean;
}

function ImageCard({
    image,
    onDelete,
    onSecondaryAction,
    onClick,
    onPermanentlyDelete,
    isRecycleBin = false,
    isSharing = false,
    isDeleting = false,
    isRestoring = false,
    isPermanentlyDeleting = false,
}: ImageCardProps) {


    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => onClick(image)}
            />
            <div className="p-4 flex justify-between items-center">
                <p className="text-gray-600 text-sm truncate">{image.alt}</p>
                <div className="flex space-x-3">
                    <button
                        onClick={() => onDelete(image)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title={isRecycleBin ? "Restore" : "Delete"}
                        disabled={isDeleting || isRestoring}
                    >
                        {isRecycleBin ? (
                            <>
                                {isRestoring ? (
                                    <svg
                                        className="animate-spin w-5 h-5 text-blue-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"
                                        />
                                    </svg>
                                ) : (
                                    <FaUndo size={20} />
                                )}
                            </>
                        ) : (
                            <>
                                {isDeleting ? (
                                    <svg
                                        className="animate-spin w-5 h-5 text-blue-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"
                                        />
                                    </svg>
                                ) : (
                                    <FaTrash size={20} />
                                )}
                            </>
                        )}
                    </button>

                    {/* permanently delete button */}
                    {isRecycleBin && onPermanentlyDelete && (
                        <button
                            onClick={() => onPermanentlyDelete(image)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Permanently Delete"
                        >
                            {isPermanentlyDeleting ? (
                                <svg
                                    className="animate-spin w-5 h-5 text-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"
                                    />
                                </svg>
                            ) : (
                                <FaTrash size={20} />
                            )}
                        </button>
                    )}
                    {!isRecycleBin && (
                        <button
                            onClick={() => onSecondaryAction(image)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Share"
                            disabled={isSharing} // Disable Share button when sharing
                        >
                            {isSharing ? (
                                <svg
                                    className="animate-spin w-5 h-5 text-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"
                                    />
                                </svg>
                            ) : (
                                <FaShareAlt size={20} />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageCard;
