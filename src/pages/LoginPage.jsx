import React, { useState } from 'react';
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const idToken = await getIdToken(auth.currentUser);
      if (idToken) {
        sessionStorage.setItem('idToken', idToken);
        await signInWithEmailAndPassword(auth, email, password);
        setEmail('');
        setPassword('');
        await Swal.fire({
          title: 'Success!',
          text: 'Login successful.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate('/');
      } else {
        console.error('Error: ID token is not available.');
      }
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
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">PROJECT 1</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input mt-1 block w-full p-2 border border-gray-300 rounded"
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
            className="form-input mt-1 block w-full p-2 border border-gray-300 rounded"
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
        <div className="text-center text-gray-700">
          <p>Dont have an account? <Link to="/register" className="text-blue-500">Register here</Link></p>
        </div>
      </form>
    </div>


  );
};

export default LoginPage;
