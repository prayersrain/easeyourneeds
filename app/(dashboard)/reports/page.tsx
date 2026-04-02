export default function ReportsListPage() {
  const reports = [
    {
      id: '1',
      meetingTitle: 'Team Meeting',
      date: '2026-03-20',
      duration: '2h 15m',
      participants: 12,
      hasRecording: true,
      hasAISummary: true,
    },
    {
      id: '2',
      meetingTitle: 'Client Presentation',
      date: '2026-03-18',
      duration: '1h 30m',
      participants: 8,
      hasRecording: true,
      hasAISummary: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Meeting Reports</h1>
        <p className="text-slate-600 mt-1">View AI summaries, participants, polls, and recordings from past meetings.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="divide-y divide-slate-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{report.meetingTitle}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                    <span>{report.date}</span>
                    <span>•</span>
                    <span>{report.duration}</span>
                    <span>•</span>
                    <span>{report.participants} participants</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={`/dashboard/reports/${report.id}/summary`}
                    className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700"
                  >
                    View Report
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
