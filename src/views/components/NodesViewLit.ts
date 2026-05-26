import { MapSize } from '@/app/MapSize';
import { $mapStore } from '@/store';
import '@/views/components/NodeOnMapLit';
import { Store } from '@/views/controllers/Store';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('nodes-view-lit')
export class NodesViewLit extends LitElement {
  private map = new Store(this, $mapStore);
  private size = MapSize();

  createRenderRoot() {
    return this;
  }

  render() {
    const objects = Object.values(this.map.value.objects);
    return html`<div
          class="relative background-grid mt-4 ml-4"
          style="width: ${this.size.width}px; height: ${this.size.height}px"
        >
          ${objects.map(object => html`<node-on-map-lit .node="${object}"></node-on-map-lit>`)}
        </div>`;
  }
}
