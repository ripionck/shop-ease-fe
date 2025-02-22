import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductInfo from '../../components/ProductInfo';
import ProductTabs from '../../components/ProductTabs';
import Spinner from '../../components/Spinner';
import useCart from '../../hooks/useCart';

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id: productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchProductData = async () => {
      try {
        const [productResponse, reviewsResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/v1/products/${productId}/`, {
            signal,
          }),
          axios.get(
            `http://localhost:8000/api/v1/products/${productId}/reviews/`,
            { signal },
          ),
        ]);

        setProductData({
          ...productResponse.data.product,
          reviews: reviewsResponse.data.reviews || [],
        });
      } catch (err) {
        if (!signal.aborted) {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProductData();
    return () => controller.abort();
  }, [productId]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const success = await addToCart(productId, 1);
      if (success) {
        toast.success('Added to cart:', productData.id, quantity);
      }
    } catch (error) {
      console.error('Cart error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
    );
  }

  if (!productData) {
    return (
      <div className="container mx-auto p-4 text-gray-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900">{productData.category}</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900">{productData.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={
                productData.images[selectedImage]?.image_url ||
                '/placeholder.svg'
              }
              alt={productData.name}
              className="w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productData.images.map((image, i) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                  selectedImage === i ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                <img
                  src={image.image_url}
                  alt={`Product view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <ProductInfo
          product={productData}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
        />
      </div>

      {/* Product Tabs */}
      <ProductTabs
        product={productData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default ProductDetails;
