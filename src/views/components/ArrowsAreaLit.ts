import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('arrows-area-lit')
export class ArrowsAreaLit extends LitElement {
  public createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="arrows-area z-10"></div>`;
  }
}
