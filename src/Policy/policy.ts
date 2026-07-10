import { Permission } from '../types';

export class PolicyEngine {
  readonly id = 'security:policy';
  private permissions: Map<string, Permission> = new Map();

  addPermission(p: Permission): void {
    this.permissions.set(p.id, p);
  }

  checkPermission(actor: string, resource: string, action: string): boolean {
    for (const permission of this.permissions.values()) {
      if (
        (permission.grantedTo === actor || permission.grantedTo === '*') &&
        (permission.resource === resource || permission.resource === '*') &&
        (permission.action === action || permission.action === '*')
      ) {
        return true;
      }
    }
    return false;
  }

  revokePermission(id: string): void {
    this.permissions.delete(id);
  }
}
