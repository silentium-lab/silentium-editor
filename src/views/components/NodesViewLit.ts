import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('nodes-view-lit')
export class NodesViewLit extends LitElement {
  createRenderRoot() { return this; }
  @property({ type: Object }) map: MapEntity | null = null;
  render() {
    return html`<div class="nodes-view-lit">NodesViewLit</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nodes-view-lit': NodesViewLit;
  }
}
