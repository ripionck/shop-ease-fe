import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import LoginForm from './LoginForm';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/login/', {
        email: formData.email,
        password: formData.password,
      });

      const { access, refresh } = response.data;
      await login({ access, refresh }, formData.rememberMe);

      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (err.response) {
        errorMessage =
          err.response.data.detail || err.response.data.message || errorMessage;
      } else if (err.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm
        formData={formData}
        error={error}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
