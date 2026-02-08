import { Link } from 'react-router-dom';
import { UserPlus, Briefcase, ArrowRight, CheckCircle, Shield } from 'lucide-react';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)]">
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-blue-50/50 to-white">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-worko-blue font-semibold text-sm animate-fadeIn">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Streamline Your Hiring Process
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
                        Refer Talent, <br />
                        <span className="text-transparent bg-clip-text bg-worko-gradient">Earn Rewards</span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        The easiest way to track candidate referrals and manage your hiring pipeline.
                        Secure, fast, and efficient.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            to="/refer"
                            className="btn-primary flex items-center gap-2 px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            <UserPlus size={20} />
                            Refer a Candidate
                        </Link>
                        <Link
                            to="/login"
                            className="btn-secondary flex items-center gap-2 px-8 py-4 text-lg border-2"
                        >
                            <Briefcase size={20} />
                            Admin Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-100 text-worko-blue rounded-xl flex items-center justify-center mb-6">
                                <UserPlus size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Referrals</h3>
                            <p className="text-gray-600">Submit candidate details and resumes in seconds with our streamlined form.</p>
                        </div>

                        <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-purple-100 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Tracking</h3>
                            <p className="text-gray-600">Monitor the status of your referrals from Pending to Hired in real-time.</p>
                        </div>

                        <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-100 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Admin Only</h3>
                            <p className="text-gray-600">Candidate data is protected. Only authorized admins can view and manage the pipeline.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
