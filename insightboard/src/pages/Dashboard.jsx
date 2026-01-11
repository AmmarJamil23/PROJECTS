import { useMemo, useState } from "react"
import KPIGrid from "@/components/dashboard/KPIGrid"
import LineChart from "@/components/charts/LineChart"
import TimeRangeSelect from "@/components/dashboard/TimeRangeSelect"

function Dashboard() {
  const [range, setRange] = useState("7d")

  const rawData = {
    "7d": [120, 150, 180, 170, 200, 230, 260],
    "30d": [80, 100, 140, 180, 220, 260, 300]
  }

  const labelsMap = {
    "7d": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "30d": ["W1", "W2", "W3", "W4", "W5", "W6", "W7"]
  }

  const values = rawData[range]

  const stats = useMemo(() => {
    const total = values.reduce((a, b) => a + b, 0)
    return [
      { label: "Total Users", value: total },
      { label: "Peak Users", value: Math.max(...values) },
      { label: "Average", value: Math.round(total / values.length) }
    ]
  }, [values])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>

        <TimeRangeSelect
          value={range}
          onChange={setRange}
        />
      </div>

      <KPIGrid stats={stats} />

      <LineChart
        labels={labelsMap[range]}
        data={values}
      />
    </div>
  )
}

export default Dashboard
