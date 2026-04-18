import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('mini-map-lit')
export class MiniMapLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  map: MapEntity | null = null;

  render() {
    return html`<div class="mini-map-lit">MiniMapLit</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mini-map-lit': MiniMapLit;
  }
}
