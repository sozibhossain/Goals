"use client";

import { useSession } from 'next-auth/react';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormData {
  email: string;
  password: string;
}

interface UserData {
  token: string;
}

interface ApiResponse {
  data?: {
    email: string;
  };
  message?: string;
  error?: string;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const session = useSession();
  const token = (session?.data?.user as UserData)?.token;

  useEffect(() => {
    const fetchCurrentEmail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/updateEp`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data: ApiResponse = await response.json();
        if (data.data?.email) {
          setFormData(prev => ({ ...prev, email: data.data!.email }));
        }
      } catch (err) {
        setError('An error occurred while fetching email');
        console.error('Fetch error:', err);
      }
    };

    if (token) {
      fetchCurrentEmail();
    }
  }, [token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/updateEp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Update successful!');
        setFormData(prev => ({ ...prev, password: '' }));
      } else {
        setError(data.error || 'Failed to update. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Update error:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Update Email or Password</h1>

      {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded pr-10"
              
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Page;
