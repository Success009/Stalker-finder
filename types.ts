
export enum AppState {
  IDLE,
  PROCESSING,
  REVEALED,
}

export type HackingMessage = {
  text: string;
  /**
   * 'fast': Rapidly typed text for data dumps.
   * 'slow': Deliberately slow typing for important story beats.
   * 'data': Triggers the friend list scan.
   * 'final': The last few messages, with maximum suspense.
   */
  type: 'fast' | 'slow' | 'data' | 'final';
  /** Optional delay in milliseconds before this message starts typing */
  delayBefore?: number;
};
