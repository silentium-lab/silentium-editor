import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('textarea-lit')
export class TextareaLit extends LitElement {
  @property({ type: String })
  private val!: string;

  @property({ type: String })
  private field!: string;

  private use = (value: InputEvent) => {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: [this.field, value.target?.value],
      })
    );
  };

  public render() {
    return html`<textarea
              class="border-1 border-gray-300 bg-white p-2 rounded-sm w-full h-24"
      name="${this.field}"
      @input="${this.use}"
            >
              ${this.val}
            </textarea>`;
  }
}
