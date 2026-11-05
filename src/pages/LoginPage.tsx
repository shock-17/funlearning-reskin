import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      const rawFrom = location.state?.from?.pathname;
      const safeFrom = typeof rawFrom === 'string' && rawFrom.startsWith('/') && !rawFrom.startsWith('//')
        ? rawFrom
        : '/home';
      navigate(safeFrom, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-[#f7f7f5] flex items-center justify-center p-6">
      <div className="bg-[#ffffff] rounded-2xl p-8 border border-[#ebebe8] w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-[#000000] text-center tracking-tight">
          Parent Sign In
        </h1>
        <p className="text-sm text-[#666662] text-center mb-8">
          Manage family profiles and view learning tracking
        </p>

        {error && (
          <div className="bg-[#f7f7f5] text-[#d0106f] p-4 rounded-xl mb-6 text-sm font-semibold border border-[#ebebe8]">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#f7f7f5] border border-[#ebebe8] rounded-xl text-[#000000] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 text-center pt-2 space-y-3">
          <p className="text-sm text-[#666662]">
            New to Learning Adventures?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-[#000000] hover:underline font-semibold"
              disabled={isLoading}
            >
              Create Account
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
