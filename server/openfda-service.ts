import type { FDADrugLabel, FDAAdverseEvent } from "../shared/medications";

const OPENFDA_BASE_URL = "https://api.fda.gov/drug";
const API_KEY = process.env.OPENFDA_API_KEY;

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export interface FDASearchResult {
  results?: any[];
  meta?: {
    results?: {
      total?: number;
    };
  };
}

function sanitizeSearchTerm(term: string): string {
  if (!term || typeof term !== 'string') {
    throw new ValidationError('Invalid search term');
  }
  
  const trimmed = term.trim();
  if (trimmed.length === 0) {
    throw new ValidationError('Search term cannot be empty');
  }
  
  return trimmed.replace(/["\\]/g, '\\$&');
}

function validateLimit(limit: number, max: number = 100): number {
  if (isNaN(limit) || limit < 1) {
    return 5;
  }
  return Math.min(limit, max);
}

async function fetchFromFDA(endpoint: string, params: Record<string, string>): Promise<any> {
  const urlParams = new URLSearchParams({
    ...params,
    ...(API_KEY ? { api_key: API_KEY } : {}),
  });

  const url = `${OPENFDA_BASE_URL}${endpoint}?${urlParams.toString()}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return { results: [], meta: { results: { total: 0 } } };
      }
      throw new Error(`FDA API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from FDA API (${endpoint}):`, error);
    throw error;
  }
}

export async function searchDrugLabel(query: string, limit: number = 5): Promise<FDASearchResult> {
  const sanitized = sanitizeSearchTerm(query);
  const validLimit = validateLimit(limit);
  
  return fetchFromFDA("/label.json", {
    search: `openfda.generic_name:"${sanitized}" OR openfda.brand_name:"${sanitized}"`,
    limit: validLimit.toString(),
  });
}

export async function getDrugLabelByName(drugName: string): Promise<FDADrugLabel | null> {
  const sanitized = sanitizeSearchTerm(drugName);
  const data = await searchDrugLabel(sanitized, 1);
  
  if (!data.results || data.results.length === 0) {
    return null;
  }
  
  const result = data.results[0];
  
  return {
    genericName: result.openfda?.generic_name?.[0],
    brandName: result.openfda?.brand_name || [],
    purpose: result.purpose || [],
    indications: result.indications_and_usage || [],
    dosage: result.dosage_and_administration || [],
    warnings: result.warnings || result.boxed_warning || [],
    adverseReactions: result.adverse_reactions || [],
    drugInteractions: result.drug_interactions || [],
    activeIngredient: result.active_ingredient || [],
  };
}

export async function searchAdverseEvents(drugName: string, limit: number = 10): Promise<FDASearchResult> {
  const sanitized = sanitizeSearchTerm(drugName);
  const validLimit = validateLimit(limit);
  
  return fetchFromFDA("/event.json", {
    search: `patient.drug.medicinalproduct:"${sanitized}"`,
    limit: validLimit.toString(),
  });
}

export async function getAdverseEventsByDrug(drugName: string): Promise<FDAAdverseEvent[]> {
  const sanitized = sanitizeSearchTerm(drugName);
  const data = await searchAdverseEvents(sanitized, 10);
  
  if (!data.results || data.results.length === 0) {
    return [];
  }
  
  return data.results.map((event: any) => ({
    receiveDate: event.receivedate,
    seriousness: event.serious,
    patientReaction: event.patient?.reaction?.map((r: any) => r.reactionmeddrapt) || [],
  }));
}

export async function searchDrugEnforcement(drugName: string, limit: number = 5): Promise<FDASearchResult> {
  const sanitized = sanitizeSearchTerm(drugName);
  const validLimit = validateLimit(limit);
  
  return fetchFromFDA("/enforcement.json", {
    search: `openfda.generic_name:"${sanitized}" OR openfda.brand_name:"${sanitized}"`,
    limit: validLimit.toString(),
  });
}
