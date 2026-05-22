import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import { Destroyable, MessageType } from 'silentium';

/**
 * Методы для управления окном
 */
export class ModalController<T> {
  private opened = false;

  public constructor(
    private host: LitElement,
    private setter: (v: any) => void
  ) {  }

  private onClose() {
    this.opened = false;
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }
}
