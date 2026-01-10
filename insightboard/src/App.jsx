import KPIGrid from "./components/dashboard/KPIGrid";
import { useState } from "react";
import LineChart from "./components/charts/LineChart"


function App() {
    const [range, setRange] = useState("7d");

    const stats = [
        { label: "Active Users", value: "1,200"},
        { label: "Revenue", value: "Rs200000"},
        { label: "Conversion Rate", value: "%5.0"}
    ]

    const chartData = {
        "7d": [120, 150, 180, 170, 200, 230, 260],
        "30d": [80, 100, 140, 180, 220, 200 ,300]
    }

    const labels =
    range === "7d" 
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["W1", "W2", "W3", "W4", "W5" ,"W6", "W7"]

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold"> 
                InsightBoard
            </h1>

            <KPIGrid stats={stats} />

            <div className="flex gap-2">
                <button
                className="px-3 py-1 border rounded"
                onClick={() => setRange("7d")}
                >
                    7 Days
                </button>

                <button
                className="px-3 py-1 border rounded"
                onClick={() => setRange("30d")}
                >
                    30 Days
                </button>
            </div>

            <LineChart
            labels={labels}
            data={chartData[range]}
            />

        </div>
    )
}

export default App;