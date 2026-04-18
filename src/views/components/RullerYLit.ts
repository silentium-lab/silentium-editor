import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('ruller-y-lit')
export class RullerYLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div>RullerYLit</div>`;
  }
}
