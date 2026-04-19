import { LitElement } from "lit";
import { Destroyable, MessageType } from "silentium";

export function Observe<T>(host: LitElement, source$: MessageType<T>) {
  return new ObserveImpl(host, source$);
}

/**
 * Наблюдаемое свойство из MessageType
 */
export class ObserveImpl<T> {
  private sub?: MessageType;
  public value!: T;

  public constructor(private host: LitElement, private source$: MessageType<T>) {
    this.host.addController(this);
  }

  public hostConnected() {
    this.sub = this.source$.then((value) => {
      this.value = value;
      this.host.requestUpdate();
    });
  }

  public hostDisconnected() {
    Destroyable(this.sub).destroy();
  }
}
