import { Tr } from '@/io/Translation';
import { MapStream } from '@/models/MapStream';
import { TheNodeType } from '@/types/NodeType';
import '@/views/components/ModalLit';
import '@/views/components/TypeFormLit';
import { Observe } from '@/views/controllers/Observe';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { All, Applied, Context } from 'silentium';

@customElement('node-type-modal-lit')
export class NodeTypeModalLit extends LitElement {
  @property({ type: Object })
  private map!: MapStream;

  @state()
  private opened = false;

  @state()
  private type?: TheNodeType;

  private typeId$ = Observe(this, Context<{ id: string }>('active-node-type-id'));

  private labels = {
    objectType: Observe(this, Tr('Object type')),
    save: Observe(this, Tr('Save')),
    delete: Observe(this, Tr('Delete')),
  } as const;

  connectedCallback() {
    super.connectedCallback();
    this.typeId$.source().then(() => {
      this.opened = true;
    });
    Applied(All(this.typeId$.source(), this.map.message()), ([typeId, localMap]) => {
      return localMap.typeById(typeId.id).data();
    }).then(t => {
      this.type = t;
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
    if (!this.type) {
      return;
    }
    this.map.saveNodeType(this.type);
    this.opened = false;
  }

  private onChange(ev: CustomEvent) {
    this.type = ev.detail;
  }

  private onClose() {
    this.opened = false;
  }

  render() {
    return html`<modal-lit
      .title="${this.labels.objectType.value + ' #' + this.type?.id}"
      .opened = "${this.opened}" @close = "${this.onClose}"
        .content = "${this.type && html`<type-form-lit .type="${this.type}" @change="${this.onChange}"></type-form-lit>`}"
          .actions = "${html`<button class="btn" @click="${this.onSave}">${this.labels.save.value}</button>
    <button class= "btn bg-danger text-base" @click = "${this.onDelete.bind(this)}" > ${this.labels.delete.value} </button>`}"
     >
    </modal-lit>`;
  }
}
