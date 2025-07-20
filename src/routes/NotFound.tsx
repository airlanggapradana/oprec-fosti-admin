import {Home, Search, ArrowLeft, MapPin} from 'lucide-react';
import {useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main 404 Content */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-slate-200 leading-none select-none">
            404
          </h1>
          <div className="relative -mt-8 md:-mt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              We searched everywhere, but the page you're looking for seems to have wandered off into the digital
              wilderness.
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="mb-12 relative">
          <div
            className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
            <MapPin className="w-16 h-16 text-indigo-500"/>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-48 h-48 border-2 border-dashed border-slate-300 rounded-full opacity-50 animate-pulse"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            <ArrowLeft className="w-4 h-4"/>
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <Home className="w-4 h-4"/>
            Home Page
          </Button>
        </div>

        {/* Additional Help */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5"/>
            What can you do?
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-slate-700 mb-1">Check the URL</div>
              <div className="text-slate-500">Make sure the address is spelled correctly</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-700 mb-1">Use Navigation</div>
              <div className="text-slate-500">Try our main menu or search function</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-700 mb-1">Contact Support</div>
              <div className="text-slate-500">We're here to help if you need assistance</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm text-slate-400">
          <p>Error Code: 404 • Page Not Found</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;