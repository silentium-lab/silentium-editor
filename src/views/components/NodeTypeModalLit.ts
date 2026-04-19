import { Tr } from '@/io/Translation';
import { MapStream } from '@/models/MapStream';
import { TheNodeType } from '@/types/NodeType';
import { Observe } from '@/views/controllers/Observe';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Context, Late, Primitive } from 'silentium';

@customElement('node-type-modal-lit')
export class NodeTypeModalLit extends LitElement {
  @property({ type: Object })
  private map!: MapStream;

  @state()
  private opened = false;

  private type$ = Late<TheNodeType>();
  private typeId$ = Observe(this, Context<{ id: string }>('active-node-type-id'));

  private labels = {
    save: Observe(this, Tr('Save')),
    delete: Observe(this, Tr('Delete')),
  } as const;

  createRenderRoot() {
    return this;
  }

  private onDelete() {
    const type = this.map.nodeType(this.typeId$.value.id);
    type.delete();
    this.opened = false;
  }

  private onSave() {
    const type = Primitive(this.type$);
    this.map.saveNodeType(type.primitiveWithException());
    this.opened = false;
  }

  render() {
    return html`<modal-lit .opened="${this.opened}">
      <type-form-lit .typeLocal$="${this.type$}"></type-form-lit>
      <div slot="actions" class="flex gap-2">
        <button class="btn" @click="${this.onSave}">${this.labels.save.value}</button>
        <button class="btn bg-danger text-base" @click="${this.onDelete.bind(this)}">${this.labels.delete.value}</button>
      </div>
    </modal-lit>`;
  }
}
