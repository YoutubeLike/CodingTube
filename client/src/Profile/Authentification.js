// Authentification.js
import React, { useState } from 'react';

const Authentification = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="max-w-md mx-auto m-8 p-6 bg-white rounded shadow-md">
        <label className="block mb-4">
          <span className="text-gray-700">Username:</span>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            className="mt-1 p-2 border rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Authentification;
