import { MapStream } from '@/models/MapStream';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@/views/components/TypeViewLit';
import { NodeTypeEntity } from '@/models/NodeTypeEntity';
import { Context, DestroyContainer, Primitive } from 'silentium';
import { ThePoint } from '@/types/Point';
import { Observe } from '@/views/controllers/Observe';

@customElement('types-panel-lit')
export class TypesPanelLit extends LitElement {
  @property({ type: Object })
  public map!: MapStream;

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

  private canvasPosition$ = Observe(this, Context<ThePoint>('canvas-position'));
  private onNewNode = (e: any) => {
    this.map.addNode(e.detail.type, [
      e.detail.position[0] + this.canvasPosition$.value.x - 200,
      e.detail.position[1] + this.canvasPosition$.value.y + 40,
    ]);
  }

  public render() {
    return html`
        <div class="types-panel flex flex-col gap-4 relative px-2 z-10">
          ${this.types.map((type) => html`<type-view-lit .theType="${type}" @new-node="${this.onNewNode}"></type-view-lit>`)}
    </div>`;
  }
}
