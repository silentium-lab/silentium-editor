import { NodeTypeSave } from '@/app/NodeTypeSave';
import { Tr } from '@/io/Translation';
import { MapStream } from '@/models/MapStream';
import { mapDispatch } from '@/store';
import { TheNodeType } from '@/types/NodeType';
import '@/views/components/ModalLit';
import '@/views/components/TypeFormLit';
import { Observe } from '@/views/controllers/Observe';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('node-type-modal-lit')
export class NodeTypeModalLit extends LitElement {
  @property({ type: Boolean })
  private opened = false;

  @property({ type: Object })
  private type?: TheNodeType;

  private labels = {
    objectType: Observe(this, Tr('Object type')),
    save: Observe(this, Tr('Save')),
    delete: Observe(this, Tr('Delete')),
  } as const;

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  createRenderRoot() {
    return this;
  }

  private onDelete() {
    this.onClose();
  }

  private onSave() {
    if (!this.type) {
      return;
    }
    mapDispatch(NodeTypeSave(this.type)).then(() => {
      this.onClose();
    });
  }

  private onChange(ev: CustomEvent) {
    this.type = ev.detail;
  }

  private onClose() {
    this.opened = false;
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`<modal-lit
      .title="${this.labels.objectType.value + ' #' + this.type?.id}"
      .opened="${this.opened}"
      @close="${this.onClose}"
      .content="${this.type &&
      html`<type-form-lit .type="${this.type}" @change="${this.onChange}"></type-form-lit>`}"
      .actions="${html`<button class="btn" @click="${this.onSave}">
          ${this.labels.save.value}
        </button>
        <button class="btn bg-danger text-base" @click="${this.onDelete.bind(this)}">
          ${this.labels.delete.value}
        </button>`}"
    >
    </modal-lit>`;
  }
}
