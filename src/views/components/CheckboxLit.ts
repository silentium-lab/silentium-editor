import { Emit } from '@/views/controllers/Emit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('checkbox-lit')
export class CheckboxLit extends LitElement {
  public createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  object!: any;

  @property({ type: String })
  field!: string;

  emit = Emit(this, (e: Event) => (e.target as HTMLInputElement).checked);

  @property({ type: String })
  label!: string;

  public render() {
    return html`<label
      ><input
        type="checkbox"
        class="border-1 border-gray-300 bg-white p-2 rounded-sm w-full"
        name="${this.field}"
        .value="${this.object[this.field]}"
        @input="${this.emit}"
      />${this.label}</label
    >`;
  }
}
