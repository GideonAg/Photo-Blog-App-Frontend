import { FaShareAlt, FaTrash, FaUndo } from "react-icons/fa";

interface Image {
    id: number;
    src: string;
    alt: string;
}

interface ImageCardProps {
    image: Image;
    onDelete: (image: Image) => void;
    onSecondaryAction: (image: Image) => void;
    onClick: (image: Image) => void;
    isRecycleBin?: boolean;
}


function ImageCard({ image, onDelete, onSecondaryAction, onClick, isRecycleBin = false }: ImageCardProps) {
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
                    >
                        {isRecycleBin ? <FaUndo size={20} /> : <FaTrash size={20} />}
                    </button>
                    {!isRecycleBin && (
                        <button
                            onClick={() => onSecondaryAction(image)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Share"
                        >
                            <FaShareAlt size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageCard