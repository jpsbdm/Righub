import { validateEmail, formatDate, deepClone } from '../../src/backend/utils';

describe('Shared Utilities', () => {
  it('should validate emails correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  it('should format dates as YYYY-MM-DD', () => {
    const date = new Date('2024-05-20T10:00:00Z');
    expect(formatDate(date)).toBe('2024-05-20');
  });

  it('should deep clone an object', () => {
    const original = { a: 1, b: { c: 2 } };
    const clone = deepClone(original);
    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
    expect(clone.b).not.toBe(original.b);
  });
});
