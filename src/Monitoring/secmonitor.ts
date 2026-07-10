import { SecurityEvent } from '../types';

export class SecurityMonitor {
  readonly id = 'security:monitor';
  private watchedEngines: Set<string> = new Set();
  private alertListeners: ((event: SecurityEvent) => void)[] = [];

  watch(engineId: string): void {
    this.watchedEngines.add(engineId);
  }

  onAlert(listener: (event: SecurityEvent) => void): void {
    this.alertListeners.push(listener);
  }

  alert(event: SecurityEvent): void {
    for (const listener of this.alertListeners) {
      try {
        listener(event);
      } catch (e) {
        // Suppress listener errors to maintain monitoring pipeline
      }
    }
  }
}
