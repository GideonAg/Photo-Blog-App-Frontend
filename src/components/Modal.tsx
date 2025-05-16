import { FaShareAlt, FaTrash, FaUndo } from "react-icons/fa";


interface Image {
    id: string;
    src: string;
    alt: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: Image | null;
    onDelete: (image: Image) => void;
    onSecondaryAction: (image: Image) => void;
    isRecycleBin?: boolean;
}

function Modal({ isOpen, onClose, image, onDelete, onSecondaryAction, isRecycleBin = false }: ModalProps) {
    if (!isOpen || !image) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    ✕
                </button>
                <img src={image.src} alt={image.alt} className="w-full h-auto max-h-[70vh] object-contain" />
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={() => onDelete(image)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title={isRecycleBin ? "Restore" : "Delete"}
                    >
                        {isRecycleBin ? <FaUndo size={24} /> : <FaTrash size={24} />}
                    </button>
                    {!isRecycleBin && (
                        <button
                            onClick={() => onSecondaryAction(image)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Share"
                        >
                            <FaShareAlt size={24} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );


}

export default Modal