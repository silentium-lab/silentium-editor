import { ReactiveControllerHost } from 'lit';
import { ReactiveController } from 'lit';
import { ReadableAtom } from 'nanostores';

export class Store<T> implements ReactiveController {
  value: T;
  private unsubscribe?: () => void;

  constructor(
    private host: ReactiveControllerHost,
    private store: ReadableAtom<T>
  ) {
    this.host.addController(this);
    this.value = store.get();
  }

  hostConnected() {
    this.unsubscribe = this.store.subscribe(newValue => {
      this.value = newValue;
      this.host.requestUpdate(); // Заставляем Lit перерисоваться
    });
  }

  hostDisconnected() {
    this.unsubscribe?.();
  }
}
