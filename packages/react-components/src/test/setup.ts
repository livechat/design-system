import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
  (callback: FrameRequestCallback): number => {
    callback(0);

    return 0;
  }
);
