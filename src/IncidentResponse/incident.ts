import { SecurityEvent, Incident } from '../types';

export class IncidentResponse {
  private incidents: Map<string, Incident> = new Map();

  createIncident(event: SecurityEvent): Incident {
    const incident: Incident = {
      id: `incident:${Math.random().toString(36).substr(2, 9)}`,
      event,
      status: 'open',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.incidents.set(incident.id, incident);
    return incident;
  }

  escalate(id: string): void {
    const incident = this.incidents.get(id);
    if (incident) {
      incident.status = 'escalated';
      incident.escalatedTo = 'Security Operations Center (SOC)';
      incident.updatedAt = Date.now();
    }
  }

  resolve(id: string, notes: string): void {
    const incident = this.incidents.get(id);
    if (incident) {
      incident.status = 'resolved';
      incident.notes = notes;
      incident.updatedAt = Date.now();
    }
  }

  getIncident(id: string): Incident | undefined {
    return this.incidents.get(id);
  }
}
