import { tr } from '@/io/Translation';
import { TheNode } from '@/types/Node';
import '@/views/components/CheckboxLit';
import '@/views/components/SelectLit';
import '@/views/components/NodeRelationsLit';
import '@/views/components/NodeVariablesLit';
import { Rethrow } from '@/views/controllers/Rethrow';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('node-form-lit')
export class NodeFormLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  node!: TheNode;

  rethrow = Rethrow(this);

  typesList = [];

  render() {
    return html`<div>
      <div class="mb-2">
        <label>
          <span class="block">
            <checkbox-lit
              .label="${tr('Name as link')}"
              .val="${this.node.linked}"
              field="linked"
            ></checkbox-lit>
          </span>
        </label>
      </div>
      ${this.node.linked
        ? html`<div id="link" class="mb-2">
            <label>
              <span class="block">
                <input-lit
                  .object="${this.node}"
                  field="outlink"
                  @model-updated="${this.rethrow}"
                ></input-lit>
              </span>
            </label>
          </div>`
        : ''}
      <div id="name" class="mb-2">
        <label>
          <b> ${tr('Name top')} </b>
          <span class="block">
            <input-lit
              .object="${this.node}"
              field="additionalName"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </span>
        </label>
      </div>
      <div id="variables" class="mb-2">
        <label>
          <b> ${tr('Variables')} </b>
          <span class="block">
            <node-variables-lit
              .object="${this.node}"
              field="additionalFields"
              @model-updated="${this.rethrow}"
            ></node-variables-lit>
          </span>
        </label>
      </div>
      <div id="bottom-name" class="mb-2">
        <label>
          <b> ${tr('Name bottom')} </b>
          <span class="block">
            <input-lit
              .object="${this.node}"
              field="name"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </span>
        </label>
      </div>
      <div id="description" class="mb-2">
        <label>
          <b> ${tr('Description')} </b>
          <span class="block">
            <input-lit
              .object="${this.node}"
              field="description"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </span>
        </label>
      </div>
      <div id="zindex" class="mb-2">
        <label>
          <b> ${tr('Z-index')} </b>
          <span class="block">
            <input-lit
              .object="${this.node}"
              field="zindex"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </span>
        </label>
      </div>
      <div id="width" class="mb-2">
        <label>
          <b> ${tr('Width')} </b>
          <span class="block">
            <input-lit
              .object="${this.node}"
              field="width"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </span>
        </label>
      </div>
      <div id="height" class="mb-2">
        <label>
          <b> ${tr('Height')} </b>
          <span class="block">
            <input-lit
              .object="${this.node}"
              field="height"
              @model-updated="${this.rethrow}"
            ></input-lit>
          </span>
        </label>
      </div>
      <div class="mb-2">
        <label>
          <b> ${tr('Object type')} </b>
          <span class="block">
            <select-lit
              .list="${this.typesList}"
              .object="${this.node}"
              field="typeId"
              @model-updated="${this.rethrow}"
            ></select-lit>
          </span>
        </label>
      </div>
      <div class="mb-2">
        <label>
          <b> ${tr('Relations')} </b>
          <span class="block">
            <node-relations-lit
              .object="${this.node}"
              field="arrows"
              @model-updated="${this.rethrow}"
            ></node-relations-lit>
          </span>
        </label>
      </div>
    </div>`;
  }
}
