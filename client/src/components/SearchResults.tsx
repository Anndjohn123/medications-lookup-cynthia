import { Button } from "@/components/ui/button";
import type { Medication } from "@shared/medications";

interface SearchResultsProps {
  results: Medication[];
  onSelect: (medication: Medication) => void;
}

export default function SearchResults({ results, onSelect }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground px-1">
        {results.length} {results.length === 1 ? 'result' : 'results'} found
      </p>
      <div className="grid gap-2">
        {results.map((medication) => (
          <Button
            key={medication.id}
            variant="outline"
            onClick={() => onSelect(medication)}
            className="min-h-12 h-auto py-4 px-4 justify-start text-left hover-elevate"
            data-testid={`button-result-${medication.id}`}
          >
            <div className="space-y-1 w-full">
              <p className="font-semibold text-lg">{medication.genericName}</p>
              <p className="text-sm text-muted-foreground">{medication.brandNames}</p>
              <p className="text-base text-foreground/80 line-clamp-1">
                {medication.primaryUse}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
