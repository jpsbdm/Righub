import { logError, logInfo, logWarning } from '../../src/backend/logging';

describe('Logging & Error Handling', () => {
  it('should log an error', () => {
    const error = new Error('Database connection failed');
    expect(() => logError(error, { db: 'postgres' })).not.toThrow();
  });

  it('should log info messages', () => {
    expect(() => logInfo('Server started', 'system')).not.toThrow();
  });

  it('should log warning messages', () => {
    expect(() => logWarning('High memory usage', 'monitor')).not.toThrow();
  });
});
