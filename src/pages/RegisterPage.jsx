import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password validation
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
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user data to Firestore
      const user = userCredential.user;
      const userData = {
        firstName,
        lastName,
        email,
        phone,
      };
      await addDoc(collection(db, 'users'), userData);

      // Clear form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');

      // Show success message
      await Swal.fire({
        title: 'Success!',
        text: 'Registration successful.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      // Handle registration errors
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
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="form-input mt-1 block w-full"
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
            className="form-input mt-1 block w-full"
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
            className="form-input mt-1 block w-full"
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
            className="form-input mt-1 block w-full"
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
            className="form-input mt-1 block w-full"
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
            className="form-input mt-1 block w-full"
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;