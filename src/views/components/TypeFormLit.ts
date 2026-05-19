import { Tr } from '@/io/Translation';
import { TheNodeType } from '@/types/NodeType';
import { Observe } from '@/views/controllers/Observe';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@/views/components/InputLit';
import '@/views/components/TextareaLit';

@customElement('type-form-lit')
export class TypeFormLit extends LitElement {
  public createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  private type!: TheNodeType;

  private labels = {
    name: Observe(this, Tr('Name')),
    code: Observe(this, Tr('Code')),
    width: Observe(this, Tr('Width')),
    height: Observe(this, Tr('Height')),
  } as const;

  private handle = (pair: CustomEvent) => {
    this.type = {
      ...this.type,
      [pair.detail[0]]: pair.detail[1]
    }
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: this.type,
      })
    );
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
            <textarea-lit .val="${this.type.markup}" field="markup" @change="${this.handle}"></textarea-lit>
          </div>
        </label>
      </div>
      <div class="mb-2">
        <label>
          <b> ${this.labels.width.value} </b>
          <div>
            <input-lit .val="${this.type.width}" field="width" @change="${this.handle}"></input-lit>
          </div>
        </label>
      </div>
      <div class="mb-4">
        <label>
          <b> ${this.labels.height.value} </b>
          <div>
            <input-lit .val="${this.type.height}" field="height" @change="${this.handle}"></input-lit>
          </div>
        </label>
      </div>
    </div>`;
  }
}
