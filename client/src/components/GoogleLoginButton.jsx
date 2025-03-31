import React from "react";

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.open("https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net/auth/google", "_self");
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center px-4 py-2 text-black rounded-md border border-black hover:bg-gray-100 hover:text-blue-500"
    >
      <img
        src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
        alt="Google Logo"
        className="w-6 h-6 mr-2"
      />
      Continue With Google
    </button>
  );
};

export default GoogleLoginButton;
