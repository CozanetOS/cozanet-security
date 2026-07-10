export interface SecurityEvent {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  description: string;
  timestamp: number;
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  grantedTo: string;
}

export interface AuditLog {
  eventId: string;
  actor: string;
  action: string;
  resource: string;
  outcome: 'allow' | 'deny';
  timestamp: number;
}

export interface ScanResult {
  file?: string;
  line?: number;
  match: string;
  ruleName: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface Incident {
  id: string;
  event: SecurityEvent;
  status: 'open' | 'escalated' | 'resolved';
  escalatedTo?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}
