import { useState, useCallback, useContext } from "react";
import RenderBox from "./components/RenderBox";
import ChildBox from "./components/ChildBox";
import EffectBox from "./components/EffectBox";
import { DebugContext } from "./context/DebugContext";


function App() {
  const [count, setCount] = useState(0);
  const { debugOn, toggleDebug } = useContext(DebugContext);

   const handleAction = useCallback(() => {
    console.log("child clicked");
   }, []);



  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        React Behavior Visualizer
      </h1>

      <button
      className="mb-6 px-4 py-2 border border-gray-500 rounded"
      onClick={toggleDebug}
      >
        Debug Mode: {debugOn ? "ON" : "OFF"}
      </button>

      <button
      className="mb-6 px-4 py-2 bg-white text-black rounded"
      onClick={() => setCount(count + 1)}
      >
        Trigger State Change
      </button>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {debugOn && <RenderBox name="App Component" />}
         
        {debugOn && <ChildBox onAction={handleAction} /> }

        {debugOn &&<EffectBox />}

        <div className="bg-zinc-900 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Component Renders</h2>

          <RenderBox name="Render Panel" />
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
