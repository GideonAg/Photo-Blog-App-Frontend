function ImageCard({ src, alt }:{src:string,alt:string}) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img src={src} alt={alt} className="w-full h-48 object-cover" />
            <div className="p-4">
                <p className="text-gray-600 text-sm truncate">{alt}</p>
            </div>
        </div>
    );
}

export default ImageCard