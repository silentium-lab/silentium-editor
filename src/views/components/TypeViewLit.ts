import { NodeTypeTemplate } from '@/app/NodeTypeTemplate';
import { ClickWithoutDrag } from '@/io/ClickWithoutDrag';
import { Draggable } from '@/io/Draggable';
import { TheNodeType } from '@/types/NodeType';
import '@/views/components/ModalLit';
import '@/views/components/TypeFormLit';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { DestroyContainer, Late } from 'silentium';
import { Task } from 'silentium-components';
import { ClassName } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { v4 } from 'uuid';
import { Observe } from '@/views/controllers/Observe';
import { Tr } from '@/io/Translation';
import { mapDispatch } from '@/store';
import { NodeTypeSave } from '@/app/NodeTypeSave';
import { EventSetter } from '@/app/EventSetter';
import { NodeTypeDelete } from '@/app/NodeTypeDelete';

@customElement('type-view-lit')
export class TypeViewLit extends LitElement {
  private theId = Late<string>();
  private dc = DestroyContainer();

  private labels = {
    objectType: Observe(this, Tr('Object type')),
    save: Observe(this, Tr('Save')),
    delete: Observe(this, Tr('Delete')),
  } as const;

  private modalOpenEvent = Late();
  private modalCloseEvent = Late();

  @state()
  private editType!: TheNodeType;

  public constructor() {
    super();
    const container$ = Element(ClassName(this.theId));
    const draggablePosition$ = Late<[number, number]>();
    const draggable$ = Draggable(
      container$,
      {
        containment: '.nodes-view',
      },
      draggablePosition$,
      '.node-view'
    );
    this.dc.add(draggable$);
    Task(draggable$).then(() => {
      draggablePosition$.use([0, 0]);
    });
    draggable$.then(pos => {
      this.dispatchEvent(
        new CustomEvent('new-node', {
          detail: {
            position: pos,
            type: this.type,
          },
          bubbles: true,
          composed: true,
        })
      );
    });
    const clicked$ = ClickWithoutDrag(container$);
    clicked$.then(() => {
      this.editType = { ...this.type };
      this.modalOpenEvent.use({});
    })
    this.dc.add(clicked$);
  }

  public createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  private type!: TheNodeType;

  onSave = () => {
    mapDispatch(NodeTypeSave(this.editType)).then(() => {
      this.modalCloseEvent.use({});
    });
  }

  onDelete = () => {
    mapDispatch(NodeTypeDelete(this.type)).then(() => {
      this.modalCloseEvent.use({});
    });
  }

  typeSetter = EventSetter((v) => this.editType = v);

  render() {
    this.theId.use('type-view-' + v4());
    const template = NodeTypeTemplate(this.type);
    return html`<article class="select-none">
      <h2 class="mb-2">${this.type.name}</h2>
      <div class="relative">
        <div class="${this.theId.value().primitive()} node-view select-none z-90">
          ${unsafeHTML(template)}
        </div>
        <div class="absolute top-0 left-0 z-1 w-full select-none">${unsafeHTML(template)}</div>
      </div>
      <modal-lit
      .title="${this.labels.objectType.value + ' #' + this.type?.id}"
      .openEvent="${this.modalOpenEvent}"
      .closeEvent="${this.modalCloseEvent}"
      .content="${this.editType && html`<type-form-lit .type="${this.editType}" @custom-change="${this.typeSetter}" @model-updated="${this.typeSetter}"></type-form-lit>`}"
      .actions="${html`<button class="btn" @click="${this.onSave}">
          ${this.labels.save.value}
        </button>
        <button class="btn bg-danger text-base" @click="${this.onDelete.bind(this)}">
          ${this.labels.delete.value}
        </button>
        `}"
    >
    </modal-lit>
    </article>`;
  }
}
