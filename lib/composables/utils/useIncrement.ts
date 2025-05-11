/**
 * Custom hook for managing a numeric counter with increment functionality.
 * @param initialValue - The starting value for the counter. Defaults to 0.
 * @returns An object containing the current value and an increment method
 * @example
 * const counter = useIncrement(5);
 * console.log(counter.value); // 5
 * counter.increment();
 * console.log(counter.value); // 6
 */
const useIncrement = (initialValue = 0) => ({
  /**
   * The current value of the counter.
   */
  value: initialValue,

  /**
   * Increments the value by one.
   * @returns The new value after incrementing
   */
  increment(): number {
    this.value++;

    return this.value;
  },
});

export { useIncrement };
