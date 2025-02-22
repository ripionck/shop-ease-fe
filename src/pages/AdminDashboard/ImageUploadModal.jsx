import PropTypes from 'prop-types';
import { useState } from 'react';

const ImageUploadModal = ({
  isOpen,
  onClose,
  productId,
  uploadProductImage,
}) => {
  const [files, setFiles] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(-1);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => ({
      file,
      isMain: index === 0, // Set first image as main by default
    }));
    setFiles(newFiles);
    setMainImageIndex(0);
  };

  const handleUpload = async () => {
    try {
      await Promise.all(
        files.map(async (file, index) => {
          await uploadProductImage(
            productId,
            file.file,
            index === mainImageIndex,
          );
        }),
      );
      onClose();
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Upload Product Images</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Images</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span className="truncate">{file.file.name}</span>
              <button
                type="button"
                onClick={() => setMainImageIndex(index)}
                className={`px-3 py-1 rounded text-sm ${
                  mainImageIndex === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {mainImageIndex === index ? 'Main Image' : 'Set as Main'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 space-x-3">
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
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            disabled={files.length === 0}
          >
            Upload Images
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
