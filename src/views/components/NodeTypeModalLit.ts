import { Tr } from '@/io/Translation';
import { MapStream } from '@/models/MapStream';
import { TheNodeType } from '@/types/NodeType';
import { Observe } from '@/views/controllers/Observe';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Context, Late, Primitive } from 'silentium';
import '@/views/components/TypeFormLit';
import '@/views/components/ModalLit';

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

  connectedCallback() {
    super.connectedCallback();
    this.typeId$.source().then(() => {
      this.opened = true;
    })
  }

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

  private onClose() {
    this.opened = false;
  }

  render() {
    return html`<modal-lit
      .opened="${this.opened}" @close="${this.onClose}"
      .content="${html`<type-form-lit .typeLocal$="${this.type$}"></type-form-lit>`}"
      .actions="${html`<button class="btn" @click="${this.onSave}">${this.labels.save.value}</button>
        <button class="btn bg-danger text-base" @click="${this.onDelete.bind(this)}">${this.labels.delete.value}</button>`}"
     >
    </modal-lit>`;
  }
}
