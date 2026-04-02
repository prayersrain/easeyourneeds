export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-600">Upcoming Meetings</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-600">Total Balance</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">Rp 500.000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-600">Loyalty Points</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">350</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-600">Completed Meetings</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">23</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {/* Activity items would go here */}
          <div className="p-6 text-slate-500">No recent activity</div>
        </div>
      </div>
    </div>
  );
}
