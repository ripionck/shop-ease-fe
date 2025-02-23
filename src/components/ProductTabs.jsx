import axios from 'axios';
import { Star } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const ProductTabs = ({ product, activeTab, setActiveTab, onReviewAdded }) => {
  const { isLoggedIn } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewRating || !reviewComment.trim()) {
      toast.error('Please provide a rating and comment');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('access_token');

      const response = await axios.post(
        `https://shop-ease-3oxf.onrender.com/api/v1/products/${product.id}/reviews/`,
        {
          rating: reviewRating,
          comment: reviewComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onReviewAdded(response.data.review);
      setShowReviewModal(false);
      setReviewRating(0);
      setReviewComment('');
      toast.success('Review submitted successfully!');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to submit review';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="py-6">
            <h3 className="font-bold text-lg mb-4">Product Description</h3>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'specifications':
        return (
          <div className="py-6">
            <h3 className="font-bold text-lg mb-4">Technical Specifications</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Specification
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <tr
                        key={key}
                        className="border-b hover:bg-gray-50 even:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-gray-600 font-medium">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-gray-900">{value}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Customer Reviews</h3>
              {isLoggedIn && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Write a Review
                </button>
              )}
            </div>

            {product.reviews.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-6 last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{review.reviewer}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-16">
      <div className="border-b">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-4 ${
              activeTab === 'description'
                ? 'border-b-2 border-indigo-600 font-medium text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('specifications')}
            className={`py-4 ${
              activeTab === 'specifications'
                ? 'border-b-2 border-indigo-600 font-medium text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 ${
              activeTab === 'reviews'
                ? 'border-b-2 border-indigo-600 font-medium text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Reviews
          </button>
        </nav>
      </div>
      {renderTabContent()}

      {/* Review Modal */}
      {showReviewModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Write a Review</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewRating(rating)}
                      className={`w-8 h-8 ${
                        reviewRating >= rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Comment
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

ProductTabs.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    specifications: PropTypes.object.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        reviewer: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  onReviewAdded: PropTypes.func.isRequired,
};

export default ProductTabs;
