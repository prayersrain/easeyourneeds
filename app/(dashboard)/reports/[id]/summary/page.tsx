import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';

export default function AISummaryPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href={`/dashboard/reports/${params.id}`}
          className="text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">AI Summary</h1>
      </div>

      {/* AI Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Meeting Summary</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700">
            Workshop membahas strategi marketing Q2 2026. Tim sepakat untuk fokus pada 
            digital campaign dengan budget 60% untuk social media ads. Diskusi juga 
            mencakup rencana konten untuk Instagram, TikTok, dan LinkedIn.
          </p>
        </div>
      </div>

      {/* Smart Chapters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Smart Chapters</h2>
        <div className="space-y-3">
          {[
            { time: '00:05', title: 'Budget Review', duration: '15 min' },
            { time: '00:20', title: 'Campaign Strategy', duration: '25 min' },
            { time: '00:45', title: 'Q&A Session', duration: '20 min' },
            { time: '01:05', title: 'Action Items', duration: '10 min' },
          ].map((chapter, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900">{chapter.title}</p>
                  <p className="text-sm text-slate-600">{chapter.duration}</p>
                </div>
              </div>
              <span className="text-sm font-mono text-sky-600">{chapter.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Action Items</h2>
        <div className="space-y-3">
          {[
            { task: 'Submit budget proposal', due: '1 Apr 2026', assignee: 'John Doe' },
            { task: 'Create social media calendar', due: '5 Apr 2026', assignee: 'Jane Smith' },
            { task: 'Schedule follow-up meeting', due: '3 Apr 2026', assignee: 'Bob Wilson' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg"
            >
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">{item.task}</p>
                <div className="flex items-center space-x-4 mt-1 text-sm text-slate-600">
                  <span>Due: {item.due}</span>
                  <span>•</span>
                  <span>{item.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
