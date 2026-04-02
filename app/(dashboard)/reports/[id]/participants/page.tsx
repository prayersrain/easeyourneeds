import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

export default function ParticipantsPage({ params }: { params: { id: string } }) {
  const participants = [
    { name: 'John Doe', joinTime: '10:00', leaveTime: '12:00', duration: '2h 0m' },
    { name: 'Jane Smith', joinTime: '10:05', leaveTime: '12:00', duration: '1h 55m' },
    { name: 'Bob Wilson', joinTime: '10:00', leaveTime: '11:30', duration: '1h 30m' },
    { name: 'Alice Brown', joinTime: '10:02', leaveTime: '12:00', duration: '1h 58m' },
    { name: 'Charlie Davis', joinTime: '10:10', leaveTime: '12:00', duration: '1h 50m' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={`/dashboard/reports/${params.id}`}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Participants</h1>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Total Participants</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">45</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Peak Concurrent</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">42</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Avg. Attendance Duration</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">1h 48m</p>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Join Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Leave Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Duration
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {participants.map((participant, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {participant.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {participant.joinTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {participant.leaveTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {participant.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
