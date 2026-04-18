import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('type-view-lit')
export class TypeViewLit extends LitElement {
  createRenderRoot() { return this; }

  @property({ type: Object })
  map: MapEntity | null = null;

  render() {
    return html`<div class="type-view-lit">TypeViewLit</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'type-view-lit': TypeViewLit;
  }
}
