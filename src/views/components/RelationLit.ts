import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('relation-lit')
export class RelationLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  map: MapEntity | null = null;

  public connectedCallback() {
    super.connectedCallback();
    this.classList.add('p-2');
  }

  render() {
    return html`<div>TypeNewLit</div>`;
  }
}
