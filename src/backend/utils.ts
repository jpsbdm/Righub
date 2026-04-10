// utils.ts – Shared utilities and validation helpers

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
