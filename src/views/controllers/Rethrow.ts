import { LitElement } from 'lit';

export function Rethrow<T>(host: LitElement) {
  return (e: CustomEvent) => {
    host.dispatchEvent(
      new CustomEvent('model-updated', {
        detail: e.detail,
      })
    );
  };
}
