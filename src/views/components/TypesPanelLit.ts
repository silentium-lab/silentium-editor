import { MapStream } from '@/models/MapStream';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@/views/components/TypeViewLit';
import { NodeTypeEntity } from '@/models/NodeTypeEntity';
import { Context, Primitive } from 'silentium';
import { ThePoint } from '@/types/Point';

@customElement('types-panel-lit')
export class TypesPanelLit extends LitElement {
  @property({ type: Object })
  public map!: MapStream;

  public constructor() {
    super();
    this.map.message().then(map => {
      this.types = map.types()
    })
  }

  createRenderRoot() {
    return this;
  }

  @state()
  private types!: NodeTypeEntity[];

  private canvasPosition$ = Primitive(Context<ThePoint>('canvas-position'));
  private onNewNode = (e: any) => {
    this.map.addNode(e.detail.type, [
      e.detail.position[0] + this.canvasPosition$.primitiveWithException().x - 200,
      e.detail.position[1] + this.canvasPosition$.primitiveWithException().y + 40,
    ]);
  }

  render() {
    return html`
        <div class="types-panel flex flex-col gap-4 relative px-2 z-10">
          ${this.types.map((type) => html`<type-view-lit .the-type="${type}" @new-node="${this.onNewNode}"></type-view-lit>`)}
    </div>`;
  }
}
