import { Users, Clock, CheckCircle, Briefcase } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-worko hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
        <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const StatsHub = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
                title="Total Referrals"
                value={stats.total}
                icon={Users}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <StatCard
                title="Pending Review"
                value={stats.pending}
                icon={Clock}
                color="bg-gradient-to-br from-yellow-400 to-orange-500"
            />
            <StatCard
                title="Reviewed"
                value={stats.reviewed}
                icon={Briefcase}
                color="bg-gradient-to-br from-purple-500 to-indigo-600"
            />
            <StatCard
                title="Hired Candidates"
                value={stats.hired}
                icon={CheckCircle}
                color="bg-gradient-to-br from-green-400 to-emerald-600"
            />
        </div>
    );
};

export default StatsHub;
