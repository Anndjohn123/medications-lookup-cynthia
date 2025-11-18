import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import type { Medication } from "@shared/medications";

interface MedicationCardProps {
  medication: Medication;
  onSearchAgain: () => void;
}

export default function MedicationCard({ medication, onSearchAgain }: MedicationCardProps) {
  return (
    <Card className="w-full shadow-md" data-testid={`card-medication-${medication.id}`}>
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-3xl font-bold leading-tight" data-testid="text-generic-name">
          {medication.genericName}
        </CardTitle>
        <p className="text-xl text-muted-foreground" data-testid="text-brand-names">
          {medication.brandNames}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1.5">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
            <div className="space-y-0.5 flex-1">
              <p className="text-base font-semibold">Primary Use</p>
              <p className="text-lg leading-relaxed" data-testid="text-primary-use">
                {medication.primaryUse}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-start gap-3">
            <Pill className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-0.5 flex-1">
              <p className="text-base font-semibold">How to Take</p>
              <p className="text-lg leading-relaxed" data-testid="text-how-to-take">
                {medication.howToTake}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-destructive/10 rounded-md p-4 space-y-1.5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-0.5 flex-1">
              <p className="text-base font-bold text-destructive">Important Warnings</p>
              <p className="text-lg leading-relaxed font-semibold" data-testid="text-warnings">
                {medication.warnings}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="space-y-0.5 flex-1">
              <p className="text-base font-semibold">Common Side Effects</p>
              <p className="text-lg leading-relaxed" data-testid="text-side-effects">
                {medication.sideEffects}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button 
            onClick={onSearchAgain} 
            className="w-full h-12 text-base font-semibold"
            data-testid="button-search-again"
          >
            Search Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
