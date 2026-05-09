declare module 'lenis' {
  export default class Lenis {
    constructor(options?: {
      lerp?: number;
      duration?: number;
      smoothWheel?: boolean;
    });
    raf(time: number): void;
    destroy(): void;
  }
}
