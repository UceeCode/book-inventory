declare module 'lodash.debounce' {
    const debounce: <T extends (...args: any[]) => any>(
      func: T,
      wait: number,
      options?: { leading?: boolean; trailing?: boolean }
    ) => T;
    export default debounce;
  }
  