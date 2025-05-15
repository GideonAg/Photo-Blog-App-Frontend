import { useEffect, useState } from "react";
import Layout from "../../layout/Layout"
import ImageCard from "../ImageCard";
import Pagination from "../Pagination";
import Modal from "../Modal";
import axios from "axios";

interface Image {
	id: number;
	src: string;
	alt: string;
}

function Dashboard() {
	const [images, setImages] = useState<Image[]>([]);
	const [deletedImages, setDeletedImages] = useState<Image[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedImage, setSelectedImage] = useState<Image | null>(null);
	const [message, setMessage] = useState<String>("");
	const [isloading, setIsLoading] = useState(false);
	const imagesPerPage: number = 8;
	const totalPages: number = Math.ceil(images.length / imagesPerPage);


	useEffect(() => {
		setIsLoading(true)
		const fetchImages = async () => {
			try {
				const api_link = import.meta.env.VITE_API_URL;
				const response = await axios.get(`${api_link}/photos`, {headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}`}});
				if(response && response.status) {
					if(response.data.message === "No active photos found") {
						console.log(response.data.message)
						setMessage(response.data.message);
						setIsLoading(false);
					}
				}
			} catch (error) {
				console.log(error)
			}
			// const mockImages: Image[] = Array.from({ length: 50 }, (_, i) => ({
			// 	id: i,
			// 	src: `https://picsum.photos/300/200?random=${i}`,
			// 	alt: `Image ${i + 1}`,
			// }));
			// setImages(mockImages);
		};
		fetchImages();
	}, []);

	const handleDelete = (image: Image): void => {
		setImages(images.filter((img) => img.id !== image.id));
		setDeletedImages([...deletedImages, image]);
		if (selectedImage && selectedImage.id === image.id) {
			setSelectedImage(null);
		}
	};

	const handleShare = (image: Image): void => {
		alert(`Sharing ${image.alt}`);
	};

	const handlePageChange = (page: number): void => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const paginatedImages: Image[] = images.slice(
		(currentPage - 1) * imagesPerPage,
		currentPage * imagesPerPage
	);

	return (
		<Layout>
			<h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Images</h1>
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
			):(
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{paginatedImages && paginatedImages.length > 0 ? (
							paginatedImages.map((image) => (
								<ImageCard
									key={image.id}
									image={image}
									onDelete={handleDelete}
									onSecondaryAction={handleShare}
									onClick={setSelectedImage}
								/>
						))):(
							<div className="h-48 w-full col-span-1 sm:col-span-2 lg:col-span-4 flex items-center justify-center">
								<p className="text-center font-semibold text-lg">{message}</p>
							</div>
						)}

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
						onDelete={handleDelete}
						onSecondaryAction={handleShare}
					/>
				</>
			)}
		</Layout>
	);
}

export default Dashboard