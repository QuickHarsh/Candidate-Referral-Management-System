import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Clock, UserCheck, Briefcase } from 'lucide-react';
import axios from 'axios';

const StatusDropdown = ({ currentStatus, onUpdate, candidateId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState(currentStatus);
    const dropdownRef = useRef(null);

    const statuses = [
        { value: 'Pending', label: 'Pending', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
        { value: 'Reviewed', label: 'Reviewed', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
        { value: 'Hired', label: 'Hired', icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    ];

    const currentStatusConfig = statuses.find(s => s.value === status) || statuses[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = async (newStatus) => {
        setStatus(newStatus);
        setIsOpen(false);
        if (onUpdate) {
            try {
                const token = localStorage.getItem('token');
                await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/candidates/${candidateId}/status`, {
                    status: newStatus
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                onUpdate(candidateId, newStatus);
            } catch (err) {
                console.error("Failed to update status", err);
                setStatus(currentStatus);
            }
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${currentStatusConfig.bg} ${currentStatusConfig.color} ${currentStatusConfig.border} hover:shadow-sm`}
            >
                <currentStatusConfig.icon size={14} />
                <span>{status}</span>
                <ChevronDown size={14} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-fadeIn">
                    {statuses.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${status === option.value ? 'text-worko-blue font-medium bg-blue-50/50' : 'text-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <option.icon size={14} className={option.color} />
                                <span>{option.label}</span>
                            </div>
                            {status === option.value && <Check size={14} className="text-worko-blue" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatusDropdown;
