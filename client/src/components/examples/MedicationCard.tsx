import MedicationCard from "../MedicationCard";
import { medications } from "@shared/medications";

export default function MedicationCardExample() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <MedicationCard 
        medication={medications[0]} 
        onSearchAgain={() => console.log("Search again clicked")} 
      />
    </div>
  );
}
