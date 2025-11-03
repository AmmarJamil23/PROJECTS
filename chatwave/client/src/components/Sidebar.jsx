import React from "react";
import { Card, CardContent } from "./ui/card";

const Sidebar = () => {
  return (
    <div className="h-full overflow-y-auto">
      <Card className="m-3 shadow-sm">
        <CardContent className="p-4 text-center font-semibold">
          ChatWave Sidebar
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
