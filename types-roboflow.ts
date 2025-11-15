
export interface RoboflowPrediction {
  class: string;
  confidence: number;
}

export interface GeminiAnalysis {
  explanation: string;
  summary: {
    title: string;
    points: string[];
  };
  riskAssessment: {
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    justification: string;
  };
  recommendation: Recommendation;
}

export interface Recommendation {
  priority: 'Low' | 'Medium' | 'High';
  nextSteps: string[];
  disclaimer: string;
  followUp: string;
}

export interface ReportData {
  image: string;
  predictions: RoboflowPrediction[];
  analysis: GeminiAnalysis;
}

export interface RoboflowConfig {
  url: string;
  apiKey: string;
}
