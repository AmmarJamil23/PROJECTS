function App() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        React Behavior Visualizer
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Component Renders</h2>
          <p className="text-gray-400 text-sm">
            Visualize how often components rerender
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4">
          <h2 className="font-semibold mb-2">State Changes</h2>
          <p className="text-gray-400 text-sm">
            Track which state triggered updates
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Effects</h2>
          <p className="text-gray-400 text-sm">
            See when effects run and clean up
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Performance</h2>
          <p className="text-gray-400 text-sm">
            Detect unnecessary rerenders
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
