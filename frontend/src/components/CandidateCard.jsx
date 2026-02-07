import { useState } from 'react';
import { FileText, Phone, Mail, Briefcase } from 'lucide-react';
import axios from 'axios';

const CandidateCard = ({ candidate, onStatusUpdate }) => {
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setLoading(true);
        try {
            // Update port in CandidateCard.jsx
            const res = await axios.put(`http://localhost:5001/api/candidates/${candidate._id}/status`, {
                status: newStatus
            });
            if (res.data.success) {
                onStatusUpdate(candidate._id, newStatus);
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    const statusColors = {
        Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
        Hired: 'bg-green-100 text-green-800 border-green-200',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <Briefcase size={16} />
                        <span className="text-sm font-medium">{candidate.jobTitle}</span>
                    </div>
                </div>
                <select
                    value={candidate.status}
                    onChange={handleStatusChange}
                    disabled={loading}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${statusColors[candidate.status]}`}
                >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Hired">Hired</option>
                </select>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${candidate.email}`} className="hover:text-blue-600 transition-colors">
                        {candidate.email}
                    </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${candidate.phone}`} className="hover:text-blue-600 transition-colors">
                        {candidate.phone}
                    </a>
                </div>

                {candidate.resumeUrl && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <a
                            href={`http://localhost:5001${candidate.resumeUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mt-2 p-2 bg-blue-50 rounded-lg w-full justify-center hover:bg-blue-100 transition-colors"
                        >
                            <FileText size={16} />
                            View Resume
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CandidateCard;
