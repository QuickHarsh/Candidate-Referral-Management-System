import { Link, useLocation } from 'react-router-dom';
import { Briefcase, UserPlus } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50';
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Worko.ai</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${isActive('/')}`}
                        >
                            <Briefcase size={20} />
                            Dashboard
                        </Link>
                        <Link
                            to="/refer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${isActive('/refer')}`}
                        >
                            <UserPlus size={20} />
                            Refer Candidate
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
