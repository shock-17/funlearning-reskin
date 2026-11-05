import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.name.trim(), formData.email.trim(), formData.password);
      navigate('/home');
    } catch (err: any) {
      setError(err?.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-[100svh] bg-[#f7f7f5] flex items-center justify-center p-6">
      <div className="bg-[#ffffff] rounded-2xl p-8 border border-[#ebebe8] w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-[#000000] text-center tracking-tight">
          Create Parent Account
        </h1>
        <p className="text-sm text-[#666662] text-center mb-8">
          Safe learning with progress monitoring and private records
        </p>

        {error && (
          <div className="bg-[#f7f7f5] text-[#d0106f] p-4 rounded-xl mb-6 text-sm font-semibold border border-[#ebebe8]">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#f7f7f5] border border-[#ebebe8] rounded-xl text-[#000000] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#f7f7f5] border border-[#ebebe8] rounded-xl text-[#000000] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#f7f7f5] border border-[#ebebe8] rounded-xl text-[#000000] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
              disabled={isLoading}
              placeholder="Minimum 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#f7f7f5] border border-[#ebebe8] rounded-xl text-[#000000] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 text-center pt-2 space-y-3">
          <p className="text-sm text-[#666662]">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#000000] hover:underline font-semibold"
              disabled={isLoading}
            >
              Sign In
            </button>
          </p>
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-sm text-[#666662] hover:text-[#000000]"
              disabled={isLoading}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
