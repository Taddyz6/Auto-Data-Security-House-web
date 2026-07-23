export const PROCESS_AUTO_ADVANCE_MS = 5_000;
export const PROCESS_MANUAL_RESUME_MS = 15_000;

export function getProcessAdvanceDelay(isManualPauseActive: boolean) {
  return isManualPauseActive
    ? PROCESS_MANUAL_RESUME_MS
    : PROCESS_AUTO_ADVANCE_MS;
}
