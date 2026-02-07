import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Loader } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';

const Dashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/candidates');
            if (res.data.success) {
                setCandidates(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching candidates:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = (id, newStatus) => {
        setCandidates(candidates.map(c =>
            c._id === id ? { ...c, status: newStatus } : c
        ));
    };

    const filteredCandidates = candidates.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Referred Candidates</h1>
                    <p className="text-gray-500 mt-1">Manage and track your candidate referrals</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Hired">Hired</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin text-blue-600" size={32} />
                </div>
            ) : filteredCandidates.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 border-dashed">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No candidates found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCandidates.map(candidate => (
                        <CandidateCard
                            key={candidate._id}
                            candidate={candidate}
                            onStatusUpdate={handleStatusUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
