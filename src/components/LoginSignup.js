import React, { useState } from 'react';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form>
        <input
          type="text"
          placeholder="Email"
          className="border border-gray-300 p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 mb-4 w-full"
          required
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 p-2 mb-4 w-full"
            required
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mb-4"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button
          type="button"
          onClick={toggleForm}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? 'Create an account' : 'Already have an account?'}
        </button>
      </form>
    </div>
  );
};

export default LoginSignup;
