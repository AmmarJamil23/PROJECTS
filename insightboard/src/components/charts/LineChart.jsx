import { useEffect, useRef} from "react"
import { Chart } from "chart.js/auto"

function LineChart({ labels, data}) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Active Users",
                        data,
                        borderColor: "#2563eb",
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        })

        return () => {
            chartRef.current?.destroy()
        }
    }, [labels, data])



    return (
        <div className="h-75">
            <canvas ref={canvasRef} />
        </div>
    )
}

export default LineChart;