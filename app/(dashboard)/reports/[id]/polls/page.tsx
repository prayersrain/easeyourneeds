import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PollResultsPage({ params }: { params: { id: string } }) {
  const polls = [
    {
      question: 'Which campaign do you prefer?',
      totalVotes: 45,
      options: [
        { name: 'Campaign A', votes: 30, percentage: 67 },
        { name: 'Campaign B', votes: 15, percentage: 33 },
      ],
    },
    {
      question: 'Best time for next meeting?',
      totalVotes: 42,
      options: [
        { name: 'Monday 10:00', votes: 20, percentage: 48 },
        { name: 'Wednesday 14:00', votes: 15, percentage: 36 },
        { name: 'Friday 11:00', votes: 7, percentage: 16 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href={`/dashboard/reports/${params.id}`}
          className="text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Poll Results</h1>
      </div>

      {polls.map((poll, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">{poll.question}</h2>
          <p className="text-sm text-slate-600 mb-6">{poll.totalVotes} votes</p>
          
          <div className="space-y-4">
            {poll.options.map((option, optIdx) => (
              <div key={optIdx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{option.name}</span>
                  <span className="text-sm text-slate-600">
                    {option.votes} votes ({option.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-sky-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${option.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
