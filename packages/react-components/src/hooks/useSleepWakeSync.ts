import * as React from 'react';

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
