import * as React from 'react';

/**
 * Syncs the wake event with the visibility change event.
 * @param onWake The function to call when the wake event is triggered.
 * @param enabled Whether the sync should be enabled.
 */
export const useSleepWakeSync = (onWake: () => void, enabled: boolean) => {
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        onWake();
      }
    };

    if (enabled) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      if (enabled) {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      }
    };
  }, [onWake, enabled]);
};
