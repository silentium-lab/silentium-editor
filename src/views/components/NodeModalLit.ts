import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('node-modal-lit')
export class NodeModalLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  map: any = null;

  render() {
    return html`<div class="node-modal-lit">NodeModalLit</div>`;
  }
}
