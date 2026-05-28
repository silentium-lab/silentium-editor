import { DateTimeVisual } from '@/app/DateTimeVisual';
import { NodeBottomName } from '@/app/NodeBottomName';
import { NodeDelete } from '@/app/NodeDelete';
import { NodeMove } from '@/app/NodeMove';
import { NodeSave } from '@/app/NodeSave';
import { NodeTemplate } from '@/app/NodeTemplate';
import { NodeTopName } from '@/app/NodeTopName';
import { NodeTypeForNode } from '@/app/NodeTypeForNode';
import { ClickWithoutDrag } from '@/io/ClickWithoutDrag';
import { Draggable } from '@/io/Draggable';
import { Line } from '@/io/Line';
import { Tr } from '@/io/Translation';
import { $mapStore, mapDispatch } from '@/store';
import { TheNode } from '@/types/Node';
import '@/views/components/NodeModalLit';
import '@/views/components/NodeFormLit';
import { Observe } from '@/views/controllers/Observe';
import { Store } from '@/views/controllers/Store';
import { portal } from '@/views/directives/PortalDirective';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { DestroyContainer, Late, Of, Void } from 'silentium';
import { ClassName, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { EventSetter } from '@/app/EventSetter';

@customElement('node-on-map-lit')
export class NodeOnMapLit extends LitElement {
  dc = DestroyContainer();
  lineDc = DestroyContainer();
  elementId = Observe(this, Id());

  private modalOpenEvent = Late();
  private modalCloseEvent = Late();

  private labels = {
    objectType: Observe(this, Tr('Object type')),
    save: Observe(this, Tr('Save')),
    delete: Observe(this, Tr('Delete')),
    creation: Observe(this, Tr('Creation date')),
    updation: Observe(this, Tr('Update date')),
  } as const;

  public constructor() {
    super();
    this.modalOpenEvent.then(() => {
      this.editNode = { ...this.node };
    });
  }

  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  node!: TheNode;

  @state()
  private editNode!: TheNode;

  private map = new Store(this, $mapStore);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute(
      'class',
      `node-view flex flex-col items-center z-20 text-sm select-none absolute node-id-${this.node.id}`
    );
    this.classList.add(this.elementId.value);
    const container$ = Element(ClassName(this.elementId.source()));
    this.dc.add(container$);
    const draggable$ = Draggable(container$, {}, undefined, '.node-view');
    this.dc.add(draggable$);
    draggable$.then(position => {
      mapDispatch(NodeMove(this.node, position));
    });
    queueMicrotask(() => {
      const nodeContent = this.querySelector('.node-content') as HTMLElement;
      const clicked$ = ClickWithoutDrag(Of(nodeContent));
      this.dc.add(
        clicked$.then(() => {
          console.log('open');
          this.modalOpenEvent.use({});
        })
      );
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dc.destroy();
  }

  onSave = () => {
    mapDispatch(NodeSave(this.editNode)).then(() => {
      this.modalCloseEvent.use({});
    });
  };

  onDelete = () => {
    mapDispatch(NodeDelete(this.node)).then(() => {
      this.modalCloseEvent.use({});
    });
  };

  typeSetter = EventSetter(v => (this.editNode = v));

  render() {
    this.lineDc.destroy();
    queueMicrotask(() => {
      const line$ = Line(Of(this.node)).then(Void());
      this.lineDc.add(line$);
    });
    const type = NodeTypeForNode(this.node, this.map.value);
    this.style.zIndex = (20 + this.node.zindex).toString();
    if (!this.style.left && !this.style.top) {
      this.style.transform = `translate(${this.node.position[0]}px, ${this.node.position[1]}px)`;
    } else {
      this.style.transform = `translate(0px, 0px)`;
    }
    return html`<div>
      <span> ${NodeTopName(this.node)} </span>
      <div class="node-id-${this.node.id} node-content">
        ${unsafeHTML(NodeTemplate(this.node, type))}
      </div>
      <span> ${NodeBottomName(this.node)} </span>
      ${portal(
        html`<modal-lit
          .title="${'#' + this.node.id}"
          .openEvent="${this.modalOpenEvent}"
          .closeEvent="${this.modalCloseEvent}"
          .content="${html`<div>
            <div class="mb-2">
              <b> ${this.labels.creation.value}: ${DateTimeVisual(this.node.createTimestamp)} </b>
            </div>
            <div class="mb-2">
              <b> ${this.labels.updation.value}: ${DateTimeVisual(this.node.changeTimestamp)} </b>
            </div>
            <div class="mb-2">
              <node-form-lit
                .node="${this.editNode}"
                @model-updated="${this.typeSetter}"
              ></node-form-lit>
            </div>
          </div>`}"
          .actions="${html`<button class="btn" @click="${this.onSave}">
              ${this.labels.save.value}
            </button>
            <button class="btn bg-danger text-base" @click="${this.onDelete.bind(this)}">
              ${this.labels.delete.value}
            </button> `}"
        >
        </modal-lit>`
      )}
    </div>`;
  }
}
