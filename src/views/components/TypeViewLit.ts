import { NodeTypeTemplate } from '@/app/NodeTypeTemplate';
import { ClickWithoutDrag } from '@/io/ClickWithoutDrag';
import { Draggable } from '@/io/Draggable';
import { TheNodeType } from '@/types/NodeType';
import '@/views/components/ModalLit';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { DestroyContainer, Late } from 'silentium';
import { Task } from 'silentium-components';
import { ClassName } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { v4 } from 'uuid';
import '@/views/components/NodeTypeModalLit';

@customElement('type-view-lit')
export class TypeViewLit extends LitElement {
  private theId = Late<string>();
  private dc = DestroyContainer();

  @state()
  private opened = false;

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
      this.opened = true;
    })
    this.dc.add(clicked$);
  }

  public createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  private type!: TheNodeType;

  public onClose() {
    this.opened = false;
  }

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
      <node-type-modal-lit .type="${this.type}" .opened="${this.opened}" @close="${this.onClose}"></node-type-modal-lit>
    </article>`;
  }
}
