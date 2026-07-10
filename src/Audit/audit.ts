import { AuditLog } from '../types';

export class AuditLogger {
  readonly id = 'security:audit';
  private logs: AuditLog[] = [];

  log(entry: AuditLog): void {
    this.logs.push({ ...entry });
  }

  query(filter: Partial<AuditLog>): AuditLog[] {
    return this.logs.filter(log => {
      for (const key in filter) {
        if (log[key as keyof AuditLog] !== filter[key as keyof AuditLog]) {
          return false;
        }
      }
      return true;
    });
  }

  export(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}
