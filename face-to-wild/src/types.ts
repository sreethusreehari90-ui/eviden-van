export type AnimalCategory = 'Animal' | 'Bird' | 'Insect';

export interface AnimalProfile {
  name: string;
  category: AnimalCategory;
  emoji: string;
  subtitle: string;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    border: string;
    bgGradient: string;
  };
  traits: string[];
  funFact: string;
}

export interface MatchAnalysisResponse {
  success: boolean;
  match?: string;
  category?: AnimalCategory;
  score?: number;
  reason?: string;
  features?: string[];
  hasClearFace?: boolean;
  error?: string;
  message?: string;
}

export interface SavedResult {
  match: string;
  category: AnimalCategory;
  score: number;
  reason: string;
  features: string[];
  timestamp: number;
  animal: AnimalProfile;
  capturedImage?: string;
}

export type AppState = 'camera' | 'loading' | 'reveal' | 'result' | 'error';
