import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Password and Confirm Password do not match.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = {
        firstName,
        lastName,
        email,
        phone,
      };
      await addDoc(collection(db, 'users'), userData);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      await Swal.fire({
        title: 'Success!',
        text: 'Registration successful.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/login');
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Registration failed. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Signup</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="form-input mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="form-input mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
          <label htmlFor="phone" className="block text-gray-700 font-bold">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="form-input mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-bold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-input mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
