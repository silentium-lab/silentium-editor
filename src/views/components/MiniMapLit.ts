import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('mini-map-lit')
export class MiniMapLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="mini-map-lit">MiniMapLit</div>`;
  }
}
