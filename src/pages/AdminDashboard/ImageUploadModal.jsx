import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const ImageUploadModal = ({
  isOpen,
  onClose,
  productId,
  uploadProductImage,
}) => {
  const [files, setFiles] = useState([]);
  const [mainImageId, setMainImageId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      isMain: false,
    }));

    // Automatically set first image as main if no main selected
    if (newFiles.length > 0 && !files.some((f) => f.isMain)) {
      newFiles[0].isMain = true;
      setMainImageId(newFiles[0].id);
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleSetMain = (fileId) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => ({
        ...f,
        isMain: f.id === fileId,
      })),
    );
    setMainImageId(fileId);
  };

  const removeFile = (fileId) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((f) => f.id !== fileId);

      if (fileId === mainImageId) {
        if (newFiles.length > 0) {
          setMainImageId(newFiles[0].id);
        } else {
          setMainImageId(null);
        }
      }

      return newFiles;
    });
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      if (!productId) {
        console.error('No product ID specified');
        return;
      }

      // Create array of upload promises
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file.file);

        // Convert boolean to string explicitly
        formData.append('is_main', file.isMain ? 'True' : 'False');

        // Add content-type header
        return uploadProductImage(productId, formData);
      });

      // Execute all uploads
      await Promise.all(uploadPromises);

      // Reset state
      onClose();
      setFiles([]);
      setMainImageId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Product image upload successful!');
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Image upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">
          Upload Images for Product
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Upload Images
            <span className="ml-2 text-gray-500 text-sm">
              {files.length} selected
            </span>
          </label>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="file-upload"
            ref={fileInputRef}
          />

          <label
            htmlFor="file-upload"
            className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>

          {files.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setFiles([]);
                fileInputRef.current.value = '';
              }}
              className="mt-2 text-sm text-red-600 hover:text-red-700"
            >
              Clear all files
            </button>
          )}
        </div>

        <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
          {files.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No images selected</p>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-sm truncate">{file.file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(file.file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleSetMain(file.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        file.isMain
                          ? 'bg-blue-600 text-white cursor-default'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {file.isMain ? 'Main Image' : 'Set as Main'}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            className={`px-4 py-2 rounded-lg ${
              files.length > 0 && !isUploading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={files.length === 0 || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      </div>
    </div>
  );
};

ImageUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  uploadProductImage: PropTypes.func.isRequired,
};

export default ImageUploadModal;
