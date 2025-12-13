import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function Settings() {
  const [name, setName] = useState("Ammar Jamil");
  const [email, setEmail] = useState("ammar@example.com");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const saveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
            <Button onClick={saveSettings}>Save Profile</Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Enable dark theme
              </p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
