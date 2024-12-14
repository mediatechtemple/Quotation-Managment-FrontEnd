'use client';
import React from 'react';

const LoginForm = ({ onLogin, onForgotPassword }) => {
  return (
    <form
      onSubmit={onLogin}
      className="w-full max-w-md p-8 bg-[#f5f5f5] shadow-md rounded-md backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold  text-center mb-6 text-gray-800">
        Welcome Back!
      </h2>

      <div className="mb-6">
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mobile Number
        </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your mobile number"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your password"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
