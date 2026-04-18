import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('ruller-x-lit')
export class RullerXList extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div>RullerXList</div>`;
  }
}
