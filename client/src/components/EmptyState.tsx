import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Medication } from "@shared/medications";

interface EmptyStateProps {
  searchQuery: string;
  availableMedications: Medication[];
  onMedicationClick: (medication: Medication) => void;
}

export default function EmptyState({ 
  searchQuery, 
  availableMedications,
  onMedicationClick 
}: EmptyStateProps) {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <SearchX className="h-16 w-16 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold" data-testid="text-no-results">
          No medication found for "{searchQuery}"
        </h2>
        <p className="text-lg text-muted-foreground">
          Try searching for one of these common medications:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto pt-4">
        {availableMedications.map((med) => (
          <Button
            key={med.id}
            variant="outline"
            onClick={() => onMedicationClick(med)}
            className="h-auto py-3 px-4 justify-start text-left hover-elevate"
            data-testid={`button-medication-${med.id}`}
          >
            <div className="space-y-0.5">
              <p className="font-semibold text-base">{med.genericName}</p>
              <p className="text-sm text-muted-foreground">{med.brandNames}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
