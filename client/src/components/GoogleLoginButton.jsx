import React, { useState } from "react";

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setLoading(true);
    setError(null);
    
    const loginWindow = window.open(
      "https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net/auth/google",
      "_self"
    );

    if (!loginWindow) {
      setLoading(false);
      setError("Unable to open login window. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={handleLogin}
        className="flex items-center px-4 py-2 text-black rounded-md border border-black hover:bg-gray-100 hover:text-blue-500"
        aria-label="Continue with Google"
      >
        <img
          src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
          alt="Google Logo"
          className="w-6 h-6 mr-2"
        />
        Continue with Google
      </button>

      {loading && <p className="text-gray-500">Redirecting to Google...</p>}

      {error && <p className="text-red-500">{error}</p>}

      <p className="text-sm text-gray-400">
      </p>
    </div>
  );
};

export default GoogleLoginButton;
