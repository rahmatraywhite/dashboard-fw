import React, { useState } from 'react';
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate  } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      await Swal.fire({
        title: 'Success!',
        text: 'Login successful.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      sessionStorage.setItem('idToken', getIdToken(auth.currentUser));
      navigate('/');
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Login failed. Please check your email and password.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input mt-1 block w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input mt-1 block w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
