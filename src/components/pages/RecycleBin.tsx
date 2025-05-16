import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import ImageCard from "../ImageCard";
import Modal from "../Modal";
import Pagination from "../Pagination";
import axios, { AxiosError } from "axios";

interface Image {
    id: string;
    src: string;
    alt: string;
}

function RecycleBin() {
    // const [images, setImages] = useState<Image[]>([]);
    const [deletedImages, setDeletedImages] = useState<Image[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [message, setMessage] = useState<String>("");
    const [successmessage, setSuccessMessage] = useState<String>("");
	const [isloading, setIsLoading] = useState(false);
    const imagesPerPage: number = 8;
    const totalPages: number = Math.ceil(deletedImages.length / imagesPerPage);
    const [restoringImageId, setRestoringImageId] = useState<string | null>(null);
    const [pdeletingImageId, setPdeletingImageId] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true)
		const fetchImages = async () => {
			try {
				const api_link = import.meta.env.VITE_API_URL;
				const response = await axios.get(`${api_link}/recycle-bin`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}`}});
                console.log(response)
				if(response && response.status === 200) {
                    if (Array.isArray(response.data) && response.data.length === 0) {
                        console.log("No deleted images found.");
                        setMessage("No deleted images found.");
                        setIsLoading(false);
                    }
                    else {
                        const fetchedImages: Image[] = response.data.map(
							(photo: { photoId: string; imageName: string; presignedUrl:string }, index: number) => ({
								id: photo.photoId,
								src: photo.presignedUrl,
								alt: `Image ${index + 1}`,
							})
						);
						setDeletedImages(fetchedImages);
                        setIsLoading(false);
                    }
				}
			} catch (error) {
                setIsLoading(false);
				console.log(error);
			}
		};
		fetchImages();
    }, []);

    const handlePermanentDelete = async (image: Image): Promise<any> => {
        setPdeletingImageId(image.id);
        try {
            const api_link = import.meta.env.VITE_API_URL;
            const response = await axios.delete(`${api_link}/recycle-bin/${image.id}`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}`}});
            if(response.status === 200) {
                setSuccessMessage("Image permanently deleted successfully");
                const newList = deletedImages.filter((e) => e.id !== image.id);
                setDeletedImages(newList);
            }
            else {
                setSuccessMessage(response.data.message || response.data.error);
            }
        } catch (error) {
            if(error instanceof AxiosError) {
                setSuccessMessage(error.response?.data.message || error.response?.data.error);
            }
        }
        finally {
            setPdeletingImageId(null);
        }
    }

    const handleRestore = async (image: Image): Promise<any> => {
        setRestoringImageId(image.id);
        try {
            const api_link = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${api_link}/recycle-bin/${image.id}/restore`, {}, {headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}`}});
            if(response.status === 200) {
                setSuccessMessage("Image restored successfully");
                const newList = deletedImages.filter((e) => e.id !== image.id);
                setDeletedImages(newList);
            }
            else {
                setSuccessMessage(response.data.message || response.data.error);
            }
        } catch (error) {
            if(error instanceof AxiosError) {
                setSuccessMessage(error.response?.data.message || error.response?.data.error);
            }
        }
        finally {
            setRestoringImageId(null);
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
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Recycle Bin</h1>
            {successmessage && (
                <>
                    <div className="h-48 w-full col-span-1 sm:col-span-2 lg:col-span-4 flex items-center justify-center">
                        <p className="text-center font-semibold text-lg">{successmessage}</p>
                    </div>
                </>
            )}
            {isloading ? (
                <>
                    <div className="flex items-center justify-center h-48 w-full">
						
						<div role="status">
							<svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
							</svg>
							<span className="sr-only">Loading...</span>
						</div>

					</div>
                </>
            ): (
                <>
                    {deletedImages.length === 0 ? (
                        <div className="h-48 w-full col-span-1 sm:col-span-2 lg:col-span-4 flex items-center justify-center">
                            <p className="text-center font-semibold text-lg">{message}</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {paginatedImages.map((image) => (
                                    <ImageCard
                                        key={image.id}
                                        image={image}
                                        onDelete={handleRestore}
                                        onSecondaryAction={handleRestore}
                                        onPermanentlyDelete={handlePermanentDelete}
                                        onClick={setSelectedImage}
                                        isRecycleBin={true}
                                        isRestoring={restoringImageId === image.id}
                                        isPermanentlyDeleting={pdeletingImageId === image.id}
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
                </>
            )}
        </Layout>
    );
}

export default RecycleBin