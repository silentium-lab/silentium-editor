import { MapStream } from '@/models/MapStream';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@/views/components/TypeViewLit';
import { NodeTypeEntity } from '@/models/NodeTypeEntity';
import { Context, DestroyContainer, Primitive } from 'silentium';
import { ThePoint } from '@/types/Point';
import { Observe } from '@/views/controllers/Observe';
import { Store } from '@/views/controllers/Store';
import { $store } from '@/store';

@customElement('types-panel-lit')
export class TypesPanelLit extends LitElement {

  @state()
  private types: NodeTypeEntity[] = [];

  private dc = DestroyContainer();
  public connectedCallback() {
    super.connectedCallback();
    this.dc.add(this.map.message().then(map => {
      this.types = map.types()
    }));
  }

  public disconnectedCallback() {
    this.dc.destroy();
    super.disconnectedCallback();
  }

  public createRenderRoot() {
    return this;
  }

  private map = new Store(this, $store);

  private onNewNode = (e: any) => {
    this.map.addNode(e.detail.type, [
      e.detail.position[0] + this.map.value.scrollPosition[0] - 200,
      e.detail.position[1] + this.map.value.scrollPosition[1] + 40,
    ]);
  }

  public render() {
    return html`
        <div class="types-panel flex flex-col gap-4 relative px-2 z-10">
          ${this.types.map((type) => html`<type-view-lit .theType="${type}" @new-node="${this.onNewNode}"></type-view-lit>`)}
    </div>`;
  }
}
