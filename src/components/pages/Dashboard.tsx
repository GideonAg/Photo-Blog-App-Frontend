import { useEffect, useState } from "react";
import Layout from "../../layout/Layout"
import ImageCard from "../ImageCard";
import Pagination from "../Pagination";
import Modal from "../Modal";

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
	const imagesPerPage: number = 8;
	const totalPages: number = Math.ceil(images.length / imagesPerPage);

	useEffect(() => {
		const mockImages: Image[] = Array.from({ length: 50 }, (_, i) => ({
			id: i,
			src: `https://picsum.photos/300/200?random=${i}`,
			alt: `Image ${i + 1}`,
		}));
		setImages(mockImages);
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
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Your Images</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{paginatedImages.map((image) => (
					<ImageCard
						key={image.id}
						image={image}
						onDelete={handleDelete}
						onSecondaryAction={handleShare}
						onClick={setSelectedImage}
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
				onDelete={handleDelete}
				onSecondaryAction={handleShare}
			/>
		</Layout>
	);
}

export default Dashboard