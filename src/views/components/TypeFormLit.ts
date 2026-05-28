import { tr } from '@/io/Translation';
import { TheNodeType } from '@/types/NodeType';
import '@/views/components/InputLit';
import '@/views/components/TextareaLit';
import { Rethrow } from '@/views/controllers/Rethrow';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('type-form-lit')
export class TypeFormLit extends LitElement {
  public createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  private type!: TheNodeType;

  rethrow = Rethrow(this);

  public render() {
    return html`<div>
      <div class="mb-2">
        <label>
          <b> ${tr('Name')} </b>
          <div class="block">
            <input-lit
              .object="${this.type}"
              field="name"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </div>
        </label>
      </div>
      <div class="mb-2">
        <label>
          <b> ${tr('Code')} </b>
          <div>
            <textarea-lit
              .object="${this.type}"
              field="markup"
              @model-updated="${this.rethrow}"
            ></textarea-lit>
          </div>
        </label>
      </div>
      <div class="mb-2">
        <label>
          <b> ${tr('Width')} </b>
          <div>
            <input-lit
              .object="${this.type}"
              field="width"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </div>
        </label>
      </div>
      <div class="mb-4">
        <label>
          <b> ${tr('Height')} </b>
          <div>
            <input-lit
              .object="${this.type}"
              field="height"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </div>
        </label>
      </div>
    </div>`;
  }
}
