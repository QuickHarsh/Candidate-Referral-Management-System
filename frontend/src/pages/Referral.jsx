import { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, AlertCircle, User, Briefcase, Mail, Phone, FileText, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

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
            await axios.post(`${API_URL}/api/candidates`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus({ type: 'success', message: 'Candidate referred successfully!' });
            setFormData({ name: '', email: '', phone: '', jobTitle: '', resume: null });
            setFileName('');

            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Something went wrong' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] w-full flex items-center justify-center bg-gray-50/50 p-6 overflow-hidden">
            <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-full max-h-[800px]">

                <div className="h-2 bg-worko-gradient flex-shrink-0"></div>

                <div className="flex flex-col md:flex-row h-full">

                    <div className="md:w-5/12 bg-slate-50 p-10 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -ml-16 -mb-16"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-worko-blue mb-8 shadow-md transform -rotate-3">
                                <Send size={40} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                Refer a <span className="text-transparent bg-clip-text bg-worko-gradient">Talent</span>
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Connect us with the best professionals in your network.
                                <br className="hidden md:block" />
                                Help them land their dream job and earn rewards.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-gray-700 bg-white/80 p-4 rounded-2xl backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">1</div>
                                    <span className="font-medium">Enter candidate details</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-700 bg-white/80 p-4 rounded-2xl backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                                    <span className="font-medium">Upload their resume</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-700 bg-white/80 p-4 rounded-2xl backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">3</div>
                                    <span className="font-medium">Track status in Dashboard</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-7/12 p-10 md:p-12 flex flex-col justify-center bg-white overflow-y-auto custom-scrollbar">
                        {status.message && (
                            <div className={`p-4 rounded-2xl mb-8 flex items-center gap-3 animate-fadeIn ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {status.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                                <span className="font-semibold text-lg">{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-worko-blue transition-colors">
                                            <User size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="input-worko pl-12 py-3.5 text-lg"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Job Title</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-worko-blue transition-colors">
                                            <Briefcase size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            required
                                            className="input-worko pl-12 py-3.5 text-lg"
                                            placeholder="Senior Developer"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-worko-blue transition-colors">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="input-worko pl-12 py-3.5 text-lg"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Phone Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-worko-blue transition-colors">
                                            <Phone size={20} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            pattern="[0-9]{10}"
                                            className="input-worko pl-12 py-3.5 text-lg"
                                            placeholder="1234567890"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Resume (PDF)</label>
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
                                        className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 gap-4 ${fileName
                                            ? 'border-worko-blue bg-blue-50/50'
                                            : 'border-gray-200 hover:border-worko-blue hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-full shadow-sm ${fileName ? 'bg-blue-100 text-worko-blue' : 'bg-gray-100 text-gray-500'}`}>
                                            {fileName ? <FileText size={24} /> : <Upload size={24} />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-lg font-semibold ${fileName ? 'text-worko-blue' : 'text-gray-700'}`}>
                                                {fileName || 'Upload Resume'}
                                            </span>
                                            {!fileName && <span className="text-sm text-gray-400">PDF up to 5MB</span>}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 text-white text-xl font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 mt-4 ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-worko-gradient hover:shadow-xl'
                                    }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Referral'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Referral;
