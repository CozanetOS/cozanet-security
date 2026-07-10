import * as crypto from 'crypto';

export class EncryptionEngine {
  private readonly algorithm = 'aes-256-gcm';
  private readonly ivLength = 12;
  private readonly saltLength = 16;
  private readonly tagLength = 16;

  private deriveKey(key: string, salt: Buffer): Buffer {
    return crypto.scryptSync(key, salt, 32);
  }

  encrypt(data: string, key: string): string {
    const salt = crypto.randomBytes(this.saltLength);
    const iv = crypto.randomBytes(this.ivLength);
    const derivedKey = this.deriveKey(key, salt);
    
    const cipher = crypto.createCipheriv(this.algorithm, derivedKey, iv) as crypto.CipherGCM;
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    // Combine salt, iv, tag, and encrypted data as hex
    return [
      salt.toString('hex'),
      iv.toString('hex'),
      tag.toString('hex'),
      encrypted
    ].join(':');
  }

  decrypt(data: string, key: string): string {
    const parts = data.split(':');
    if (parts.length !== 4) {
      throw new Error('Invalid encrypted data format');
    }
    
    const salt = Buffer.from(parts[0], 'hex');
    const iv = Buffer.from(parts[1], 'hex');
    const tag = Buffer.from(parts[2], 'hex');
    const encryptedText = parts[3];
    
    const derivedKey = this.deriveKey(key, salt);
    const decipher = crypto.createDecipheriv(this.algorithm, derivedKey, iv) as crypto.DecipherGCM;
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
