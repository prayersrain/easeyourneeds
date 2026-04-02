import Link from 'next/link';
import { ArrowLeft, Download, Play, Extend } from 'lucide-react';

export default function RecordingPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href={`/dashboard/reports/${params.id}`}
          className="text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Recording</h1>
      </div>

      {/* Video Player */}
      <div className="bg-black rounded-xl overflow-hidden shadow-lg">
        <div className="aspect-video bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <Play className="h-16 w-16 text-white mx-auto mb-4" />
            <p className="text-white text-lg font-medium">Click to play recording</p>
            <p className="text-slate-400 mt-2">Duration: 2h 15m</p>
          </div>
        </div>
      </div>

      {/* Recording Info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">File Size</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">450 MB</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Duration</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">2h 15m</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Auto-Delete In</p>
          <p className="text-2xl font-bold text-red-600 mt-1">5 days</p>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Download Options</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button className="flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700">
            <Download className="h-4 w-4 mr-2" />
            Download Video (MP4)
          </button>
          <button className="flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800">
            <Download className="h-4 w-4 mr-2" />
            Download Audio (MP3)
          </button>
          <button className="flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800">
            <Download className="h-4 w-4 mr-2" />
            Download Transcript (TXT)
          </button>
        </div>
      </div>

      {/* Extend Storage */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-yellow-900">Extend Storage</h3>
            <p className="text-sm text-yellow-800 mt-1">
              Recording will be auto-deleted in 5 days. Extend storage by 7 more days.
            </p>
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 rounded-lg hover:bg-yellow-200">
            <Extend className="h-4 w-4 mr-2" />
            Extend 7 Days
          </button>
        </div>
      </div>
    </div>
  );
}
