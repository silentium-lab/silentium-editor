import { Emit } from '@/views/controllers/Emit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('select-lit')
export class SelectLit extends LitElement {
  public createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  object!: any;

  @property({ type: String })
  field!: string;

  emit = Emit(this, (e: Event) => (e.target as HTMLInputElement).value);

  @property({ type: Object })
  list!: any[];

  @property({ type: String })
  itemValueKey: string = 'id';

  @property({ type: String })
  itemLabelKey: string = 'label';

  public render() {
    return html`<select
      class="border-1 border-gray-300 bg-white p-2 rounded-sm w-full"
      name="${this.field}"
      .value="${this.object[this.field]}"
      @change="${this.emit}"
    >
      ${this.list.map(
        item => html`<option value="${item[this.itemValueKey]}">${item[this.itemLabelKey]}</option>`
      )}
    </select>`;
  }
}
