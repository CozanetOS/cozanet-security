import { ScanResult } from '../types';

export class SecretsScanner {
  private rules = [
    {
      name: 'GitHub Personal Access Token',
      pattern: /ghp_[a-zA-Z0-9]{36}/g,
      severity: 'critical' as const
    },
    {
      name: 'Generic API Key / Secret',
      pattern: /(api_key|apiKey|secret|password|passwd|private_key|token)\s*[:=]\s*['"][a-zA-Z0-9_\-]{16,}['"]/gi,
      severity: 'high' as const
    }
  ];

  scan(text: string): ScanResult[] {
    const results: ScanResult[] = [];
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const rule of this.rules) {
        rule.pattern.lastIndex = 0; // Reset regex
        let match;
        while ((match = rule.pattern.exec(line)) !== null) {
          results.push({
            line: i + 1,
            match: match[0],
            ruleName: rule.name,
            severity: rule.severity
          });
        }
      }
    }
    return results;
  }

  async scanFile(path: string): Promise<ScanResult[]> {
    // Basic mock implementation of scanFile for Node environment
    try {
      // In a real environment, we would require 'fs' and read the file
      const fs = require('fs');
      if (fs && fs.readFileSync) {
        const content = fs.readFileSync(path, 'utf8');
        const results = this.scan(content);
        return results.map(r => ({ ...r, file: path }));
      }
    } catch (e) {
      // Return scan results with stub indicating file read simulated / unsupported
    }
    return [];
  }
}
