import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Check } from 'lucide-react';

const Referral = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
    });
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResume(file);
            setError('');
        } else {
            setResume(null);
            setError('Please upload a valid PDF file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) {
            // Optional: Allow submission without resume? Requirement said Optional in one place, but strictly PDF in validation. 
            // Requirement: "Resume (optional, accept only .pdf format)."
            // So we proceed.
        }

        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('jobTitle', formData.jobTitle);
        if (resume) {
            data.append('resume', resume);
        }

        try {
            const res = await axios.post('http://localhost:5001/api/candidates', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.error || 'Failed to submit referral';
            setError(Array.isArray(msg) ? msg.join(', ') : msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Refer a Candidate</h1>
                    <p className="text-gray-500 mt-1">Help us find the best talent by referring someone you know.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3">
                        <X size={20} className="mt-0.5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="form-label">Job Title</label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                                placeholder="Product Designer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Resume (PDF)</label>
                        <div className={`mt-2 border-2 border-dashed rounded-xl p-6 transition-colors text-center ${resume ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}>
                            <input
                                type="file"
                                id="resume-upload"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer block w-full h-full">
                                {resume ? (
                                    <div className="flex flex-col items-center text-green-700">
                                        <Check size={32} className="mb-2" />
                                        <span className="font-semibold">{resume.name}</span>
                                        <span className="text-xs mt-1">Click to change</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400">
                                        <Upload size={32} className="mb-2" />
                                        <span className="font-medium text-gray-700">Click to upload or drag and drop</span>
                                        <span className="text-xs mt-1">PDF items only (Max 5MB)</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary min-w-[140px]"
                        >
                            {loading ? 'Submitting...' : 'Submit Referral'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Referral;
