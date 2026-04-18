import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('node-type-modal-lit')
export class NodeTypeModalLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  map: MapEntity | null = null;

  render() {
    return html`<div>TypeNewLit</div>`;
  }
}
