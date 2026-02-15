import { Message } from 'silentium';

/**
 * Represent true value when
 * dom content loaded
 */
export function DomLoaded() {
  return Message(resolve => {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      resolve(true);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        resolve(true);
      });
    }
  });
}
