import { useActivityStore } from "@/features/activity/useActivityStore";
import ActivityIcon from "./ActivityIcon";

export default function ActivityTab() {
  const activity = useActivityStore((s) => s.activity);

  return (
    <div className="space-y-4">
      {activity.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg p-4 bg-card flex gap-4 items-start"
        >
          {/* Icon */}
          <div className="mt-1">
            <ActivityIcon type={item.type} />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm">
              <span className="font-semibold">{item.user}</span>{" "}
              {item.action}{" "}
              <span className="font-semibold">{item.target}</span>
            </p>

            <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
