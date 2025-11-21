const App = () => {
  return (
      <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Real Inventory Management System
          </h1>
          <p className="text-lg text-gray-600">
            Modern dashboard built with React 18, Vite, and Tailwind CSS v4
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Vite
            </h3>
            <p className="text-gray-600">
              Lightning fast build tool with instant HMR
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">⚛️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              React 18
            </h3>
            <p className="text-gray-600">
              Latest React with concurrent features
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tailwind v4
            </h3>
            <p className="text-gray-600">
              Next-gen utility-first CSS framework
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ✓ Frontend Ready
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            ⚙️ Backend Pending
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            🔄 Real-time Pending
          </span>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm">
            Get Started
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default App;
