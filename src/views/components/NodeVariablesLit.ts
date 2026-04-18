import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('node-variables-lit')
export class NodeVariablesLit extends LitElement {
  createRenderRoot() { return this; }

  @property({ type: Object })
  map: MapEntity | null = null;

  render() {
    return html`<div class="node-variables-lit">NodeVariablesLit</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'node-variables-lit': NodeVariablesLit;
  }
}
