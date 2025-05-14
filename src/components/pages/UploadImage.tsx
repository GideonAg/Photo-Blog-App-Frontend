import React from 'react'
import Layout from '../../layout/Layout';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function UploadImage() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [preview, setPreview] = React.useState<string | null>(null);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (): void => {
        setIsDragging(false);
    };

    const handleUpload = (): void => {
        if (selectedFile && preview) {
            // In a real app, upload to server here and get response
            alert('Image uploaded successfully!');
            setSelectedFile(null);
            setPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            navigate('/');
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Photo</h1>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center ${
                        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <FaUpload className="mx-auto text-gray-400 text-4xl mb-4" />
                    <p className="text-gray-600 mb-4">
                        Drag and drop your image here, or click to select
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                        id="fileInput"
                    />
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        Select Image
                    </label>
                </div>
                {preview && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Preview</h2>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-64 object-contain rounded-lg shadow-md"
                        />
                        <button
                            onClick={handleUpload}
                            className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
                        >
                            Upload Image
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default UploadImage