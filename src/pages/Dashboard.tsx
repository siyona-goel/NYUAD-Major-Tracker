import { useState } from 'react';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Modern Navigation Bar */}
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo and Title */}
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-indigo-500 rounded-lg mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  NYUAD Major Tracker
                </h1>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                Courses
              </button>
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-10">
        {/* Header Section */}
        <header className="mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-400">Track your academic progress and plan your courses</p>
          </div>
        </header>

        {/* Main Content Area */}
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Progress Card */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Major Progress</h2>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-300 bg-indigo-900/50">
                        Credits Completed
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-indigo-300">
                        72%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-700">
                    <div className="w-[72%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  </div>
                </div>
              </div>

              {/* Current Semester Card */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Current Semester</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Enrolled Courses</span>
                    <span className="text-indigo-400 font-medium">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Total Credits</span>
                    <span className="text-indigo-400 font-medium">16</span>
                  </div>
                </div>
              </div>

              {/* Requirements Card */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-300">Core Requirements</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-gray-300">Major Requirements</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-300">Electives</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-8 bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700/30">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <span className="text-indigo-400">📚</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Course Registration Complete</h3>
                      <p className="text-gray-400 text-sm">Added CS-101 to your schedule</p>
                    </div>
                    <span className="text-gray-500 text-sm ml-auto">2h ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 