import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export default function ChatHighlightsPage({ params }: { params: { id: string } }) {
  const chatMessages = [
    {
      message: 'Can you share the slides?',
      sender: 'Jane Smith',
      timestamp: '10:30',
    },
    {
      message: 'Budget proposal deadline is Apr 1',
      sender: 'John Doe',
      timestamp: '11:15',
    },
    {
      message: 'Great presentation!',
      sender: 'Bob Wilson',
      timestamp: '11:45',
    },
    {
      message: 'Will the recording be available?',
      sender: 'Alice Brown',
      timestamp: '11:50',
    },
    {
      message: 'Yes, recording will be shared within 24 hours',
      sender: 'Host (You)',
      timestamp: '11:52',
    },
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
          <h1 className="text-2xl font-bold text-slate-900">Chat Highlights</h1>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
          <MessageSquare className="h-4 w-4 mr-2" />
          Export Chat
        </button>
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="divide-y divide-slate-200">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-900">{msg.message}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm font-medium text-slate-700">{msg.sender}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This shows highlighted messages only. Full chat log available in export.
        </p>
      </div>
    </div>
  );
}
