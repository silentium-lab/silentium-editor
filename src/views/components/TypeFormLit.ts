import { Tr } from '@/io/Translation';
import { TheNodeType } from '@/types/NodeType';
import { Observe } from '@/views/controllers/Observe';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@/views/components/InputLit';

@customElement('type-form-lit')
export class TypeFormLit extends LitElement {
  @property({ type: Object })
  private type!: TheNodeType;

  private labels = {
    name: Observe(this, Tr('Name')),
    code: Observe(this, Tr('Code')),
    width: Observe(this, Tr('Width')),
    height: Observe(this, Tr('Height')),
  } as const;

  private use<K extends keyof TheNodeType>(fieldName: K) {
    return (value: InputEvent) => {
      this.type[fieldName] = value.target?.value as TheNodeType[K];
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: this.type,
        })
      );
    };
  }

  private handle = (pair: CustomEvent) => {
    console.log(pair.detail);
  };

  public render() {
    return html`<div>
      <div class="mb-2">
        <label>
          <b> ${this.labels.name.value} </b>
          <div class="block">
            <input-lit .val="${this.type.name}" field="name" @change="${this.handle}"></input-lit>
          </div>
        </label>
      </div>
      <div class="mb-2">
        <label>
          <b> ${this.labels.code.value} </b>
          <div>
            <textarea
              class="border-1 border-gray-300 bg-white p-2 rounded-sm w-full h-24"
              name="markup"
              @input="${this.use('markup')}"
            >
${this.type.markup}</textarea
            >
          </div>
        </label>
      </div>
      <div class="mb-2">
        <label>
          <b> ${this.labels.width.value} </b>
          <div>
            <input
              type="text"
              name="with"
              .value="${this.type.width}"
              @input="${this.use('width')}"
            />
          </div>
        </label>
      </div>
      <div class="mb-4">
        <label>
          <b> ${this.labels.height.value} </b>
          <div>
            <input
              type="text"
              name="height"
              .value="${this.type.height}"
              @input="${this.use('height')}"
            />
          </div>
        </label>
      </div>
    </div>`;
  }
}
