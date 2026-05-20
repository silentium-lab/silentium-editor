import { NodeCreate } from '@/app/NodeCreate';
import { $appStore, $mapStore, mapDispatch } from '@/store';
import { NodeTypeNormalized } from '@/views/components/NodeTypeNormalized';
import '@/views/components/TypeViewLit';
import { Store } from '@/views/controllers/Store';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('types-panel-lit')
export class TypesPanelLit extends LitElement {
  private map = new Store(this, $mapStore);
  private app = new Store(this, $appStore);

  public createRenderRoot() {
    return this;
  }

  private onNewNode = (e: any) => {
    mapDispatch(NodeCreate(e.detail.type, [
      e.detail.position[0] + this.app.value.position[0] - 200,
      e.detail.position[1] + this.app.value.position[1] + 40,
    ]));
  };

  public render() {
    const types = Object.values(this.map.value.types);
    return html` <div class="types-panel flex flex-col gap-4 relative px-2 z-10">
      ${types.map(
        type =>
          html`<type-view-lit .type="${NodeTypeNormalized(type)}" @new-node="${this.onNewNode}"></type-view-lit>`
      )}
    </div>`;
  }
}
