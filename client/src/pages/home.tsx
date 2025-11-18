import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import MedicationCard from "@/components/MedicationCard";
import SearchResults from "@/components/SearchResults";
import EmptyState from "@/components/EmptyState";
import type { Medication } from "@shared/medications";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const { data: medications = [], isLoading } = useQuery<Medication[]>({
    queryKey: ["/api/medications"],
  });

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    return medications.filter(med => 
      med.genericName.toLowerCase().includes(query) ||
      med.brandNames.toLowerCase().includes(query)
    );
  }, [searchQuery, medications]);

  const handleSearchAgain = () => {
    setSelectedMedication(null);
    setSearchQuery("");
  };

  const handleSelectMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setSearchQuery("");
  };

  const showEmptyState = searchQuery.trim() && searchResults.length === 0;
  const showResults = searchQuery.trim() && searchResults.length > 0 && !selectedMedication;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-2xl font-semibold text-muted-foreground">
            Loading medications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-8 md:px-8 md:py-12 space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight" data-testid="text-page-title">
            Hope Street Health
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            Medication Lookup
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find clear, easy-to-understand information about your medications
          </p>
        </header>

        {!selectedMedication && (
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            onClear={handleSearchAgain}
          />
        )}

        {showResults && (
          <SearchResults 
            results={searchResults}
            onSelect={handleSelectMedication}
          />
        )}

        {showEmptyState && (
          <EmptyState 
            searchQuery={searchQuery}
            availableMedications={medications}
            onMedicationClick={handleSelectMedication}
          />
        )}

        {selectedMedication && (
          <MedicationCard 
            medication={selectedMedication}
            onSearchAgain={handleSearchAgain}
          />
        )}
      </div>
    </div>
  );
}
