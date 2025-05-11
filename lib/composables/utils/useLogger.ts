/**
 * A custom logger utility with colored console output
 *
 * @param options - Configuration options
 * @param options.enabled - Whether logging is enabled (default: true)
 * @param options.appId - Application identifier to prefix log messages
 * @returns Object with logging methods (info, success, warn, error)
 *
 * @example
 * // Basic usage
 * const logger = useLogger({ appId: 'MyApp' });
 * logger.info('Application started');
 * logger.success('Operation completed');
 * logger.warn('Resource running low');
 * logger.error('Failed to connect');
 *
 * @example
 * // Disable logging
 * const silentLogger = useLogger({ enabled: false, appId: 'MyApp' });
 */
const useLogger = ({ enabled = true, appId }) => ({
  /**
   * Logs an informational message in blue color
   * @param message - The message to log
   */
  info: (message: string) => {
    if (enabled) {
      console.log(`\x1b[34m[${appId} - INFO]\x1b[0m ${message}`);
    }
  },

  /**
   * Logs a success message in green color
   * @param message - The message to log
   */
  success: (message: string) => {
    if (enabled) {
      console.log(`\x1b[32m[${appId} - SUCCESS]\x1b[0m ${message}`);
    }
  },

  /**
   * Logs a warning message in yellow color
   * @param message - The message to log
   */
  warn: (message: string) => {
    if (enabled) {
      console.log(`\x1b[33m[${appId} - WARN]\x1b[0m ${message}`);
    }
  },

  /**
   * Logs an error message in red color
   * @param message - The message to log
   */
  error: (message: string) => {
    if (enabled) {
      console.log(`\x1b[31m[${appId} - ERROR]\x1b[0m ${message}`);
    }
  },
});
export { useLogger };
