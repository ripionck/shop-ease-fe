import PropTypes from 'prop-types';
import { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, onSubmit, categories }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brand, setBrand] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [features, setFeatures] = useState('');
  const [specifications, setSpecifications] = useState([]);
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      price: parseFloat(price),
      discounted_price: discountedPrice ? parseFloat(discountedPrice) : null,
      category: categoryId,
      brand,
      stock_quantity: parseInt(stockQuantity),
      is_active: isActive,
      features: features.split(',').map((f) => f.trim()),
      specifications: Object.fromEntries(
        specifications.map(({ key, value }) => [key, value]),
      ),
      tags: tags.split(',').map((t) => t.trim()),
      images,
    };
    onSubmit(formData);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      is_main: false,
    }));
    setImages(files);
  };

  const setMainImage = (index) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      is_main: i === index,
    }));
    setImages(updatedImages);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const updateSpecification = (index, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = value;
    setSpecifications(updatedSpecifications);
  };

  const removeSpecification = (index) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      {/* Scrollable Modal */}
      <div
        className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto"
        style={{ maxHeight: '90vh' }}
      >
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Name and Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Product Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Description */}
          <textarea
            placeholder="Description*"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg mt-4"
            required
            rows="4"
          />

          {/* Price and Discounted Price */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <input
                type="number"
                placeholder="Price*"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
                step="0.01"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Discounted Price"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                className="w-full p-2 border rounded-lg"
                step="0.01"
              />
            </div>
          </div>

          {/* Category and Stock Quantity */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Stock Quantity*"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Features and Tags */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Features (comma-separated)"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Dynamic Specifications */}
          <div className="border-t pt-4 mt-4">
            <label className="block mb-2 font-medium">Specifications</label>
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) =>
                    updateSpecification(index, 'key', e.target.value)
                  }
                  className="flex-1 p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) =>
                    updateSpecification(index, 'value', e.target.value)
                  }
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="px-3 py-1 text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecification}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
            >
              + Add Specification
            </button>
          </div>

          {/* Custom Image Upload Input */}
          <div className="border-t pt-4 mt-4">
            <label className="block mb-2 font-medium">Product Images</label>
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center space-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg p-3 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-gray-600">
                {images.length > 0
                  ? `${images.length} file(s) selected`
                  : 'Choose files'}
              </span>
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
            <div className="mt-4 space-y-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span className="truncate">{image.file.name}</span>
                  <button
                    type="button"
                    onClick={() => setMainImage(index)}
                    className={`px-3 py-1 rounded text-sm ${
                      image.is_main
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {image.is_main ? 'Main Image' : 'Set as Main'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Checkbox */}
          <label className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="form-checkbox h-4 w-4"
            />
            <span>Active Product</span>
          </label>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AddProductModal;
