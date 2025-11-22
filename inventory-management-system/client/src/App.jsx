import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
             Inventory Management System
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Built with shadcn/ui components and Tailwind CSS v4
          </p>
          <div className="flex gap-3 justify-center">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
            <Button variant="secondary">Documentation</Button>
          </div>
        </div>

        {/* Feature Cards using shadcn Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">⚡</div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Vite provides instant hot reload and optimized builds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Instant server start</li>
                <li>• HMR in &lt; 100ms</li>
                <li>• Optimized production builds</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">⚛️</div>
              <CardTitle>Modern React</CardTitle>
              <CardDescription>
                React 18 with concurrent features and hooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Concurrent rendering</li>
                <li>• Automatic batching</li>
                <li>• Suspense support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🎨</div>
              <CardTitle>Beautiful UI</CardTitle>
              <CardDescription>
                shadcn/ui components with Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Accessible by default</li>
                <li>• Fully customizable</li>
                <li>• Production ready</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;