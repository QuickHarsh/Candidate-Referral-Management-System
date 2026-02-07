import { Mail, Phone, FileText, Briefcase, ExternalLink } from 'lucide-react';
import StatusDropdown from './StatusDropdown';

const CandidateCard = ({ candidate, onStatusUpdate }) => {

    const handleStatusChange = async (newStatus) => {
        try {
            // Update logic is handled by parent, but we might want optimisic updates or API call here
            // Assuming parent handles API for now as per original code structure
            await onStatusUpdate(candidate._id, newStatus);

            // If we need to make the API call here directly:
            /*
           const res = await axios.put(`http://localhost:5001/api/candidates/${candidate._id}/status`, {
               status: newStatus
           });
           */
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    return (
        <div className="card-worko group relative flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center shadow-inner text-worko-blue font-bold text-2xl">
                        {candidate.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-worko-blue transition-colors line-clamp-1">
                            {candidate.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1 font-medium">
                            <Briefcase size={14} className="text-worko-lightBlue" />
                            <span className="line-clamp-1">{candidate.jobTitle}</span>
                        </div>
                    </div>
                </div>
                <StatusDropdown currentStatus={candidate.status} onUpdate={onStatusUpdate} candidateId={candidate._id} />
            </div>

            {/* Content */}
            <div className="space-y-3 flex-grow">
                <a href={`mailto:${candidate.email}`} className="flex items-center gap-3 text-gray-600 hover:text-worko-blue transition-colors text-sm p-2.5 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 group/item">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-white flex items-center justify-center text-gray-400 group-hover/item:text-worko-blue transition-colors">
                        <Mail size={16} />
                    </div>
                    <span className="truncate font-medium">{candidate.email}</span>
                </a>
                <a href={`tel:${candidate.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-worko-blue transition-colors text-sm p-2.5 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 group/item">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-white flex items-center justify-center text-gray-400 group-hover/item:text-worko-blue transition-colors">
                        <Phone size={16} />
                    </div>
                    <span className="font-medium">{candidate.phone}</span>
                </a>
            </div>

            {/* Footer */}
            {candidate.resumeUrl && (
                <div className="pt-4 mt-4 border-t border-gray-50">
                    <a
                        href={`http://localhost:5001${candidate.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-worko-blue hover:text-white font-semibold text-sm p-3 rounded-xl bg-blue-50 hover:bg-worko-blue transition-all duration-300 group/btn"
                    >
                        <FileText size={18} />
                        <span>View Resume</span>
                        <ExternalLink size={14} className="opacity-50 group-hover/btn:opacity-100" />
                    </a>
                </div>
            )}

            {/* Decorative bottom gradient line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-worko-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    );
};

export default CandidateCard;
