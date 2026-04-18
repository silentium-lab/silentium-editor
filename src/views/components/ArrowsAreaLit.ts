import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('arrows-area-lit')
export class ArrowsAreaLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div>ArrowsAreaLit</div>`;
  }
}
