import SearchResults from "../SearchResults";
import { medications } from "@shared/medications";

export default function SearchResultsExample() {
  const filteredMeds = medications.filter(m => 
    m.genericName.toLowerCase().includes("lo")
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SearchResults 
        results={filteredMeds}
        onSelect={(med) => console.log("Selected:", med.genericName)}
      />
    </div>
  );
}
