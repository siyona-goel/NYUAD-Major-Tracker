import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error, clearError } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      clearError();
      // You might want to add a local error state for password confirmation
      return;
    }

    if (formData.password.length < 6) {
      clearError();
      // You might want to add a local error state for password length
      return;
    }

    try {
      setIsSubmitting(true);
      clearError();
      await register(
        formData.email, 
        formData.password, 
        formData.firstName || undefined, 
        formData.lastName || undefined
      );
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the context
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-gray-900/80 border border-purple-400/20 shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-purple-200 text-center mb-2 tracking-tight drop-shadow">Create your account</h2>
        <p className="text-center text-purple-400/70 mb-8 text-sm">
          Or{' '}
          <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300 underline transition-colors">sign in to your account</Link>
        </p>
        
        {error && (
          <div className="bg-red-400/10 border border-red-400 text-red-300 px-4 py-3 rounded-lg mb-4 text-center">
            <span>{error}</span>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-purple-300 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="w-full px-5 py-3 rounded-lg bg-gray-800/60 border border-purple-400/20 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-purple-300 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="w-full px-5 py-3 rounded-lg bg-gray-800/60 border border-purple-400/20 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 rounded-lg bg-gray-800/60 border border-purple-400/20 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-5 py-3 rounded-lg bg-gray-800/60 border border-purple-400/20 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-5 py-3 rounded-lg bg-gray-800/60 border border-purple-400/20 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold text-lg shadow-md hover:from-purple-700 hover:to-purple-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;