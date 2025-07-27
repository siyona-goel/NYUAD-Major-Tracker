import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    try {
      setIsSubmitting(true);
      clearError();
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the context
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-gray-900/80 border border-purple-400/20 shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-purple-200 text-center mb-2 tracking-tight drop-shadow">Sign in to your account</h2>
        <p className="text-center text-purple-400/70 mb-8 text-sm">
          Or{' '}
          <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300 underline transition-colors">create a new account</Link>
        </p>
        
        {error && (
          <div className="bg-red-400/10 border border-red-400 text-red-300 px-4 py-3 rounded-lg mb-4 text-center">
            <span>{error}</span>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 rounded-lg bg-gray-800/60 border border-purple-400/20 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-5 py-3 rounded-lg bg-gray-800/60 border border-purple-400/20 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold text-lg shadow-md hover:from-purple-700 hover:to-purple-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-purple-400/70">
            Demo accounts available after running the seed script:
          </p>
          <div className="mt-2 text-xs text-purple-400/50 space-y-1">
            <p>student1@nyu.edu / Password123</p>
            <p>student2@nyu.edu / Password123</p>
            <p>student3@nyu.edu / Password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;