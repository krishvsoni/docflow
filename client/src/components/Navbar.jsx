import { useState, useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { Mail } from "lucide-react";

const Navbar = ({ user }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    

    const handleLogout = () => {
        window.open("http://localhost:5000/auth/logout", "_self");
        setDropdownOpen(false);
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
            }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Mail className="h-6 w-6 text-[#1a73e8]" />
                    <span className="text-xl font-bold text-gray-800">
                        <a href='/'>DocFlow</a>
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <img
                                src={user.profilePic}
                                alt="Profile"
                                className="h-12 w-12 rounded-full cursor-pointer border-2 border-blue-500"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                    <p className="px-4 py-2 text-gray-700">{user.name}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden md:inline-flex px-4 py-2 text-[#1a73e8] hover:text-[#1558b3] transition-colors">
                            <GoogleLoginButton />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
