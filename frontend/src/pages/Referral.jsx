import { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, AlertCircle, User, Briefcase, Mail, Phone, FileText, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Referral = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        resume: null
    });
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, resume: file });
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));

        try {
            await axios.post('http://localhost:5001/api/candidates', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus({ type: 'success', message: 'Candidate referred successfully!' });
            // Reset form
            setFormData({ name: '', email: '', phone: '', jobTitle: '', resume: null });
            setFileName('');

            // Redirect after delay
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Something went wrong' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-worko border border-gray-100 overflow-hidden relative">
                    {/* Decorative Top Bar */}
                    <div className="h-4 bg-worko-gradient"></div>

                    <div className="p-8 md:p-12 lg:p-16">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-worko-blue mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                <Send size={40} />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Refer a Candidate</h1>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Know someone great? Refer them to our network and help them land their dream job.
                            </p>
                        </div>

                        {status.message && (
                            <div className={`p-4 rounded-xl mb-8 flex items-center justify-center gap-3 animate-fadeIn ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                <span className="font-medium">{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-worko-blue transition-colors">
                                            <User size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="input-worko pl-12"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700 ml-1">Job Title</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-worko-blue transition-colors">
                                            <Briefcase size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            required
                                            className="input-worko pl-12"
                                            placeholder="Senior Developer"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-worko-blue transition-colors">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="input-worko pl-12"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-worko-blue transition-colors">
                                            <Phone size={20} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            pattern="[0-9]{10}"
                                            className="input-worko pl-12"
                                            placeholder="1234567890"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700 ml-1">Resume (PDF)</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="resume-upload"
                                    />
                                    <label
                                        htmlFor="resume-upload"
                                        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${fileName
                                                ? 'border-worko-blue bg-blue-50/30'
                                                : 'border-gray-200 hover:border-worko-blue hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${fileName ? 'text-worko-blue' : 'text-gray-500'}`}>
                                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                                                {fileName ? <FileText size={24} /> : <Upload size={24} />}
                                            </div>
                                            <p className="text-sm font-medium">
                                                {fileName ? fileName : (
                                                    <>
                                                        <span className="text-worko-blue font-semibold">Click to upload</span> or drag and drop
                                                    </>
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">PDF (MAX. 5MB)</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-worko-gradient hover:shadow-xl'
                                        }`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Referral'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Referral;
