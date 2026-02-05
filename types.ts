
export interface WeatherInfo {
  temp: string;
  condition: string;
  location: string;
}

export interface RiskPoint {
  id: string;
  name: string;
  type: 'fire' | 'security' | 'crowd';
  level: 'high' | 'medium' | 'low';
  coords: [number, number];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum DashboardModuleType {
  INTELLIGENCE = 'intelligence',
  INCIDENT = 'incident',
  CROWD = 'crowd',
  MONITORING = 'monitoring',
  AI_AGENT = 'ai_agent'
}
