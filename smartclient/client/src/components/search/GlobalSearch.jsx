import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useGlobalSearch } from "@/features/search/useGlobalSearch";
import { Search } from "lucide-react";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const { results, isOpen } = useGlobalSearch(query);

  return (
    <div className="relative w-full max-w-xs hidden md:block">
      <Search
        size={16}
        className="absolute left-3 top-2.5 text-muted-foreground"
      />

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects, tasks, members..."
        className="pl-9"
      />

      {isOpen && (
        <div className="absolute top-11 w-full bg-card border rounded-md shadow-lg z-50">
          {results.length === 0 && (
            <p className="p-3 text-sm text-muted-foreground">
              No results found
            </p>
          )}

          {results.map((r) => (
            <div
              key={r.id}
              className="p-3 hover:bg-muted cursor-pointer"
            >
              <p className="text-sm font-medium">{r.label}</p>
              <p className="text-xs text-muted-foreground">{r.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
