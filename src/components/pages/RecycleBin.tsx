import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import ImageCard from "../ImageCard";
import Modal from "../Modal";
import Pagination from "../Pagination";

interface Image {
    id: number;
    src: string;
    alt: string;
}

function RecycleBin() {
    const [images, setImages] = useState<Image[]>([]);
    const [deletedImages, setDeletedImages] = useState<Image[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const imagesPerPage: number = 8;
    const totalPages: number = Math.ceil(deletedImages.length / imagesPerPage);

    useEffect(() => {
        const mockDeletedImages: Image[] = Array.from({ length: 20 }, (_, i) => ({
            id: i + 100,
            src: `https://picsum.photos/300/200?random=${i + 100}`,
            alt: `Deleted Image ${i + 1}`,
        }));
        setDeletedImages(mockDeletedImages);
    }, []);

    const handleRestore = (image: Image): void => {
        setDeletedImages(deletedImages.filter((img) => img.id !== image.id));
        setImages([...images, image]);
        if (selectedImage && selectedImage.id === image.id) {
            setSelectedImage(null);
        }
    };

    const handlePageChange = (page: number): void => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedImages: Image[] = deletedImages.slice(
        (currentPage - 1) * imagesPerPage,
        currentPage * imagesPerPage
    );

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Recycle Bin</h1>
            {deletedImages.length === 0 ? (
                <p className="text-gray-600">No deleted images found.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {paginatedImages.map((image) => (
                            <ImageCard
                                key={image.id}
                                image={image}
                                onDelete={handleRestore}
                                onSecondaryAction={handleRestore}
                                onClick={setSelectedImage}
                                isRecycleBin={true}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                    <Modal
                        isOpen={!!selectedImage}
                        onClose={() => setSelectedImage(null)}
                        image={selectedImage}
                        onDelete={handleRestore}
                        onSecondaryAction={handleRestore}
                        isRecycleBin={true}
                    />
                </>
            )}
        </Layout>
    );
}

export default RecycleBin