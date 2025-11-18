export interface Medication {
  id: string;
  genericName: string;
  brandNames: string;
  primaryUse: string;
  howToTake: string;
  warnings: string;
  sideEffects: string;
}

export const medications: Medication[] = [
  {
    id: "lisinopril",
    genericName: "Lisinopril",
    brandNames: "Prinivil, Zestril",
    primaryUse: "Controls high blood pressure",
    howToTake: "Take once daily with or without food",
    warnings: "Do not stop suddenly. May cause dizziness when standing.",
    sideEffects: "Dry cough, dizziness, headache"
  },
  {
    id: "metformin",
    genericName: "Metformin",
    brandNames: "Glucophage",
    primaryUse: "Controls blood sugar in type 2 diabetes",
    howToTake: "Take with meals to reduce stomach upset",
    warnings: "May cause low blood sugar if not eating regularly.",
    sideEffects: "Nausea, diarrhea, stomach pain"
  },
  {
    id: "amlodipine",
    genericName: "Amlodipine",
    brandNames: "Norvasc",
    primaryUse: "Treats high blood pressure and chest pain",
    howToTake: "Take once daily, same time each day",
    warnings: "May cause swelling in ankles/feet.",
    sideEffects: "Dizziness, flushing, swelling"
  },
  {
    id: "atorvastatin",
    genericName: "Atorvastatin",
    brandNames: "Lipitor",
    primaryUse: "Lowers cholesterol",
    howToTake: "Take once daily, with or without food",
    warnings: "Avoid grapefruit juice. Report muscle pain immediately.",
    sideEffects: "Muscle aches, digestive issues"
  },
  {
    id: "levothyroxine",
    genericName: "Levothyroxine",
    brandNames: "Synthroid",
    primaryUse: "Replaces thyroid hormone",
    howToTake: "Take in morning 30 minutes before eating",
    warnings: "Take on empty stomach. Very important to take daily.",
    sideEffects: "Usually none if dose is correct"
  },
  {
    id: "omeprazole",
    genericName: "Omeprazole",
    brandNames: "Prilosec",
    primaryUse: "Reduces stomach acid for heartburn/GERD",
    howToTake: "Take 30 minutes before first meal of day",
    warnings: "Not for immediate heartburn relief. Long-term use may affect bone health.",
    sideEffects: "Headache, stomach pain, nausea"
  },
  {
    id: "sertraline",
    genericName: "Sertraline",
    brandNames: "Zoloft",
    primaryUse: "Treats depression and anxiety",
    howToTake: "Take once daily, with or without food",
    warnings: "Do NOT stop suddenly. May take 4-6 weeks to work.",
    sideEffects: "Nausea, drowsiness, dry mouth, sexual side effects"
  },
  {
    id: "azithromycin",
    genericName: "Azithromycin",
    brandNames: "Z-Pak, Zithromax",
    primaryUse: "Antibiotic for bacterial infections",
    howToTake: "Take full course even if feeling better",
    warnings: "Take on empty stomach if possible.",
    sideEffects: "Stomach upset, diarrhea"
  },
  {
    id: "gabapentin",
    genericName: "Gabapentin",
    brandNames: "Neurontin",
    primaryUse: "Treats nerve pain and seizures",
    howToTake: "Take 2-3 times daily as prescribed",
    warnings: "May cause drowsiness. Do not drive until you know how it affects you.",
    sideEffects: "Drowsiness, dizziness, swelling"
  },
  {
    id: "hydrochlorothiazide",
    genericName: "Hydrochlorothiazide",
    brandNames: "HCTZ, Microzide",
    primaryUse: "Treats high blood pressure (water pill)",
    howToTake: "Take in morning to avoid nighttime bathroom trips",
    warnings: "May cause dehydration. Drink plenty of water.",
    sideEffects: "Increased urination, dizziness"
  }
];
