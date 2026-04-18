import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('types-panel-lit')
export class TypesPanelLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  map: MapEntity | null = null;

  render() {
    return html`<div class="types-panel-lit">TypesPanelLit</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'types-panel-lit': TypesPanelLit;
  }
}
