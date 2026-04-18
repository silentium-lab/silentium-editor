import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('node-top-name-lit')
export class NodeTopNameLit extends LitElement {
  createRenderRoot() { return this; }

  @property({ type: Object })
  map: MapEntity | null = null;

  render() {
    return html`<div class="node-top-name-lit">NodeTopNameLit</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'node-top-name-lit': NodeTopNameLit;
  }
}
