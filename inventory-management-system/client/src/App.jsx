function App() {
  return (
    <div className="h-screen ">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Inventory Management System
        </h1>
        <p className="text-muted-foreground mb-6">
          Modern dashboard built with React, Vite, and Tailwind CSS
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-card-foreground  mb-2">
              Vite
            </h3>
            <p className="text-muted-foreground">
              Lightning fast build tool
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              React 18
            </h3>
            <p className="text-muted-foreground">
              Latest React features
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
             Tailwind CSS
            </h3>
            <p className="text-muted-foreground">
              Utility-first styling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;