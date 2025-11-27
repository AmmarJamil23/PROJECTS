import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import { statsData } from "../data/stats";

function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            change={item.change}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
