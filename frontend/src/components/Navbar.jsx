import { Link, useLocation } from 'react-router-dom';
import { Briefcase, UserPlus, Menu, LogIn, LogOut, User } from 'lucide-react';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const navLinks = [
        { path: '/', label: 'Home', icon: Briefcase }, // Changed Dashboard to Home since Dashboard is now protected/separate
        { path: '/refer', label: 'Refer Candidate', icon: UserPlus },
    ];

    if (user && user.role === 'admin') {
        navLinks.push({ path: '/dashboard', label: 'Dashboard', icon: Briefcase });
    }

    const isActive = (path) => {
        return location.pathname === path
            ? 'text-worko-blue font-semibold'
            : 'text-gray-600 hover:text-worko-blue font-medium';
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-worko-gradient rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 tracking-tight">Worko.ai</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-2 transition-colors duration-200 ${isActive(link.path)}`}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button / Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <User size={18} />
                                    {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-600 hover:text-worko-blue font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary shadow-worko hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 animate-fadeIn">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location.pathname === link.path
                                        ? 'bg-blue-50 text-worko-blue'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <link.icon size={20} />
                                    {link.label}
                                </Link>
                            ))}
                            <div className="border-t border-gray-100 pt-4 mt-2">
                                {user ? (
                                    <>
                                        <div className="px-4 py-2 text-sm font-medium text-gray-700 mb-2">
                                            Signed in as {user.name}
                                        </div>
                                        <button
                                            onClick={() => { logout(); setIsMenuOpen(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut size={20} />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-3 px-4">
                                        <Link
                                            to="/login"
                                            className="w-full btn-secondary justify-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="w-full btn-primary justify-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
