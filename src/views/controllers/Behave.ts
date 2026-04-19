import { LitElement } from "lit";
import { Destroyable, MessageSourceType, MessageType } from "silentium";

/**
 * Наблюдаемое свойство из MessageSourceType
 * Для установки внешнего поведения
 */
export function Behave<T>(host: LitElement, source$: MessageSourceType<T>) {
  return new BehaveImpl(host, source$);
}

export class BehaveImpl<T> {
  private sub?: MessageType;
  public value?: T;

  public constructor(private host: LitElement, private source$: MessageSourceType<T>) {
    this.host.addController(this);
  }

  public hostConnected() {
    this.sub = this.source$.then((value) => {
      this.value = value;
      this.host.requestUpdate();
    });
  }

  public use(value: T) {
    this.source$.use(value);
  }

  public hostDisconnected() {
    Destroyable(this.sub).destroy();
  }
}
