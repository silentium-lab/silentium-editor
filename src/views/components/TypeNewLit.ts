import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MapStream } from '@/models/MapStream';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { NodeTypeNew } from '@/app/NodeTypeNew';
import '@/views/components/TypeFormLit';
import { Observe } from '@/views/controllers/Observe';
import { Tr } from '@/io/Translation';
import { Late } from 'silentium';
import { EventSetter } from '@/app/EventSetter';
import { mapDispatch } from '@/store';
import { NodeTypeSave } from '@/app/NodeTypeSave';
import { NodeTypeDelete } from '@/app/NodeTypeDelete';

const icon =
  '<svg style="width: 20px;height: 20px" class="svg-inline--fa fa-square-plus" data-prefix="fas" data-icon="square-plus" role="img" viewBox="0 0 448 512" aria-hidden="true"><path class="" fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg>';

@customElement('type-new-lit')
export class TypeNewLit extends LitElement {
  @property({ type: Object })
  public map!: MapStream;

  public connectedCallback() {
    super.connectedCallback();
    this.classList.add('w-full');
  }

  createRenderRoot() {
    return this;
  }

  private labels = {
    objectType: Observe(this, Tr('New object type')),
    save: Observe(this, Tr('Save')),
    delete: Observe(this, Tr('Delete')),
  } as const;

  private modalOpenEvent = Late();
  private modalCloseEvent = Late();

  @state()
  type = NodeTypeNew();

  open = () => {
    this.type = NodeTypeNew();
    this.modalOpenEvent.use({});
  };

  onSave = () => {
    mapDispatch(NodeTypeSave(this.type)).then(() => {
      this.modalCloseEvent.use({});
    });
  };

  typeSetter = EventSetter(v => (this.type = v));

  render() {
    return html`<div class="w-full">
      <button class="btn w-full flex cursor-pointer justify-center" @click="${this.open}">
        ${unsafeHTML(icon)}
      </button>
      <modal-lit
        .title="${this.labels.objectType.value}"
        .openEvent="${this.modalOpenEvent}"
        .closeEvent="${this.modalCloseEvent}"
        .content="${html`<type-form-lit
          .type="${this.type}"
          @custom-change="${this.typeSetter}"
          @model-updated="${this.typeSetter}"
        ></type-form-lit>`}"
        .actions="${html`<button class="btn" @click="${this.onSave}">
          ${this.labels.save.value}
        </button>`}"
      >
      </modal-lit>
    </div>`;
  }
}
