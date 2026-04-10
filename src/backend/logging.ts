// logging.ts – Sentry and centralized logging stub

export function logError(error: Error, metadata?: Record<string, any>): void {
  console.error(`Logged Error: ${error.message}`, metadata);
  // Sentry.captureException(error, { extra: metadata });
}

export function logInfo(message: string, context?: string): void {
  console.log(`[INFO]${context ? ' [' + context + ']' : ''} ${message}`);
}

export function logWarning(message: string, context?: string): void {
  console.warn(`[WARN]${context ? ' [' + context + ']' : ''} ${message}`);
}
