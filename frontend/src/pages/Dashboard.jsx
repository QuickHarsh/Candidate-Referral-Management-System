import { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateCard from '../components/CandidateCard';
import StatsHub from '../components/StatsHub';
import { Search, Filter, Briefcase } from 'lucide-react';

const Dashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, hired: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const [candidatesRes, statsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/candidates`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/candidates/stats`, config)
            ]);

            setCandidates(candidatesRes.data.data || []);
            setStats(statsRes.data.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            if (err.response && err.response.status === 401) {
                // optional: redirect to login
            }
            setCandidates([]);
        }
    };

    const handleStatusUpdate = (id, newStatus) => {
        setCandidates(candidates.map(c =>
            c._id === id ? { ...c, status: newStatus } : c
        ));
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this candidate?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/candidates/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCandidates(candidates.filter(c => c._id !== id));
        } catch (err) {
            console.error('Error deleting candidate:', err);
        }
    };

    const filteredCandidates = candidates.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || candidate.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-[2rem] p-8 md:p-12 mb-12 border border-blue-100/50 shadow-sm relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-worko-blue text-sm font-semibold mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Referral Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Track your <span className="text-transparent bg-clip-text bg-worko-gradient">Referrals</span>
                    </h1>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Manage your candidate referrals in real-time. Help us hire the best talent and earn rewards for successful hires.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-2xl shadow-worko border border-gray-100">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or role..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-none focus:ring-0 text-gray-900 placeholder-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="md:w-px bg-gray-100 my-2"></div>
                        <div className="md:w-56 relative">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                className="w-full pl-12 pr-10 py-3 rounded-xl border-none focus:ring-0 bg-transparent text-gray-700 font-medium cursor-pointer appearance-none"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Reviewed">Reviewed</option>
                                <option value="Hired">Hired</option>
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <StatsHub stats={stats} />

            {filteredCandidates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCandidates.map((candidate) => (
                        <CandidateCard
                            key={candidate._id}
                            candidate={candidate}
                            onStatusUpdate={handleStatusUpdate}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-worko">
                    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="text-worko-blue" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No candidates found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        We couldn't find any candidates matching your search. Try adjusting your filters or refer a new candidate.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
