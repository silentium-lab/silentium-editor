import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('input-lit')
export class InputLit extends LitElement {
  @property({ type: String })
  private val!: string;

  @property({ type: String })
  private field!: string;

  private use = (value: InputEvent) => {
    this.dispatchEvent(new CustomEvent('change', {
      detail: [this.field, value.target?.value]
    }));
  }

  public render() {
    return html`<input type="text" name="${this.field}" .value="${this.val}" @input="${this.use}" />`;
  }
}
