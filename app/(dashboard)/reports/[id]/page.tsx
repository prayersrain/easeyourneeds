import Link from 'next/link';
import { FileText, Users, BarChart3, MessageSquare, Video } from 'lucide-react';

export default function ReportOverviewPage({ params }: { params: { id: string } }) {
  const reportId = params.id;

  const sections = [
    {
      name: 'AI Summary',
      description: 'AI-powered meeting summary with action items',
      icon: FileText,
      href: `/dashboard/reports/${reportId}/summary`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Participants',
      description: 'Attendance list and engagement metrics',
      icon: Users,
      href: `/dashboard/reports/${reportId}/participants`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Poll Results',
      description: 'Voting results and analytics',
      icon: BarChart3,
      href: `/dashboard/reports/${reportId}/polls`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Chat Highlights',
      description: 'Key messages from meeting chat',
      icon: MessageSquare,
      href: `/dashboard/reports/${reportId}/chat`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'Recording',
      description: 'Video playback and download',
      icon: Video,
      href: `/dashboard/reports/${reportId}/recording`,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/reports"
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back to Reports
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mt-4">Meeting Report</h1>
        <p className="text-slate-600 mt-1">Select a section to view details</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${section.bgColor}`}>
                <section.icon className={`h-6 w-6 ${section.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{section.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{section.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
