import { useEffect, useState } from "react";
import Layout from "../../layout/Layout"
import ImageCard from "../ImageCard";
import Pagination from "../Pagination";

function Dashboard() {
	const [images, setImages] = useState<any>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const imagesPerPage = 8;
	const totalPages = Math.ceil(images.length / imagesPerPage);

	useEffect(() => {
		// Mock fetching images (replace with actual API call)
		const mockImages = Array.from({ length: 50 }, (_, i) => ({
			src: `https://picsum.photos/300/200?random=${i}`,
			alt: `Image ${i + 1}`,
		}));
		setImages(mockImages);
	}, []);

	const handlePageChange = (page:number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const paginatedImages = images.slice(
		(currentPage - 1) * imagesPerPage,
		currentPage * imagesPerPage
	);

	return (
		<Layout>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Your Images</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{paginatedImages.map((image:any, index:any) => (
					<ImageCard key={index} src={image.src} alt={image.alt} />
				))}
			</div>
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</Layout>
	);
}

export default Dashboard