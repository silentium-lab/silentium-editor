import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';
import { MapStream } from '@/models/MapStream';

const icon =
  '<svg style="width: 20px;height: 20px" class="svg-inline--fa fa-square-plus" data-prefix="fas" data-icon="square-plus" role="img" viewBox="0 0 448 512" aria-hidden="true"><path class="" fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg>';

@customElement('type-new-lit')
export class TypeNewLit extends LitElement {
  @property({ type: Object })
  public map!: MapStream;

  @state()
  public opened = false;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="w-full">
      <button class="btn w-full flex justify-center">${icon}</button>
    </div>`;
  }
}

@customElement('type-new-modal-lit')
export class TypeNewModalLit extends LitElement {
  createRenderRoot() {
    return this;
  }
}
