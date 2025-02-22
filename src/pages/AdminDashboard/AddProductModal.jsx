import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const AddProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  productToEdit,
}) => {
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

  // Set initial values when productToEdit changes
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setDiscountedPrice(productToEdit.discounted_price || '');
      setCategoryId(productToEdit.category_id);
      setBrand(productToEdit.brand);
      setStockQuantity(productToEdit.stock_quantity);
      setIsActive(productToEdit.is_active);
      setFeatures(productToEdit.features.join(', '));
      setSpecifications(
        Object.entries(productToEdit.specifications).map(([key, value]) => ({
          key,
          value,
        })),
      );
      setTags(productToEdit.tags.join(', '));
    } else {
      // Reset form if no product is being edited
      setName('');
      setDescription('');
      setPrice('');
      setDiscountedPrice('');
      setCategoryId('');
      setBrand('');
      setStockQuantity('');
      setIsActive(true);
      setFeatures('');
      setSpecifications([]);
      setTags('');
    }
  }, [productToEdit]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      price: parseFloat(price),
      discounted_price: discountedPrice ? parseFloat(discountedPrice) : null,
      category_id: categoryId,
      brand,
      stock_quantity: parseInt(stockQuantity),
      is_active: isActive,
      features: features.split(',').map((f) => f.trim()),
      specifications: specifications.reduce((acc, { key, value }) => {
        if (key && value) acc.push({ key, value });
        return acc;
      }, []),
      tags: tags.split(',').map((t) => t.trim()),
    };
    onSubmit(formData);
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
      <div
        className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto"
        style={{ maxHeight: '90vh' }}
      >
        <h2 className="text-xl font-semibold mb-4">
          {productToEdit ? 'Edit Product' : 'Add Product'}
        </h2>
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
              required
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
              {productToEdit ? 'Update Product' : 'Create Product'}
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
  productToEdit: PropTypes.object,
};

export default AddProductModal;
