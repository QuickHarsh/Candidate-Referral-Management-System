import { Link, useLocation } from 'react-router-dom';
import { Briefcase, UserPlus, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Dashboard', icon: Briefcase },
        { path: '/refer', label: 'Refer Candidate', icon: UserPlus },
    ];

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

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        <button className="btn-primary shadow-worko hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                            Sign up for free
                        </button>
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
                            <button className="btn-primary w-full justify-center mt-2">
                                Sign up for free
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
