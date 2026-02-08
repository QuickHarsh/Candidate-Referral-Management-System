import { Mail, Phone, FileText, Briefcase, ExternalLink, Trash2 } from 'lucide-react';
import StatusDropdown from './StatusDropdown';

const CandidateCard = ({ candidate, onStatusUpdate, onDelete }) => {

    const handleStatusChange = async (newStatus) => {
        try {
            await onStatusUpdate(candidate._id, newStatus);

        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    return (
        <div className="card-worko group relative flex flex-col h-full">
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

            <div className={`mt-4 pt-4 border-t border-gray-50 flex items-center ${candidate.resumeUrl ? 'justify-between' : 'justify-end'}`}>
                {candidate.resumeUrl && (
                    <a
                        href={`${(import.meta.env.VITE_API_URL || 'http://localhost:5001')}${candidate.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-worko-blue hover:text-white font-semibold text-sm px-4 py-2 rounded-lg bg-blue-50 hover:bg-worko-blue transition-all duration-300 group/btn"
                    >
                        <FileText size={16} />
                        <span>Resume</span>
                        <ExternalLink size={14} className="opacity-50 group-hover/btn:opacity-100" />
                    </a>
                )}

                <button
                    onClick={() => onDelete(candidate._id)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Candidate"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-worko-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    );
};

export default CandidateCard;
