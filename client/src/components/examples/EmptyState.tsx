import EmptyState from "../EmptyState";
import { medications } from "@shared/medications";

export default function EmptyStateExample() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <EmptyState 
        searchQuery="asprin" 
        availableMedications={medications}
        onMedicationClick={(med) => console.log("Clicked medication:", med.genericName)}
      />
    </div>
  );
}
