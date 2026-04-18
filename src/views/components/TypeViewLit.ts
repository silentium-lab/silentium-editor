import { ClickWithoutDrag } from '@/io/ClickWithoutDrag';
import { Draggable } from '@/io/Draggable';
import { NodeTypeEntity } from '@/models/NodeTypeEntity';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Context, Late } from 'silentium';
import { Task } from 'silentium-components';
import { ClassName, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { v4 } from 'uuid';

@customElement('type-view-lit')
export class TypeViewLit extends LitElement {
  private theId = Late<string>();

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
    Task(draggable$).then(() => {
      draggablePosition$.use([0, 0]);
    });
    draggable$.then((pos) => {
      this.dispatchEvent(new CustomEvent('new-node', {
        detail: {
          position: pos,
          type: this.theType
        },
        bubbles: true,
        composed: true
      }))
    });
    const activeNodeTypeId$ = Context('active-node-type-id');
    const clicked$ = ClickWithoutDrag(container$);
    clicked$.then(() => {
      activeNodeTypeId$.use({ id: this.theType.id });
    });
  }

  public createRenderRoot() { return this; }

  @property({ type: Object })
  private theType!: NodeTypeEntity;

  render() {
    this.theId.use(v4());
    const template = this.theType.template();
    return html`<article class="select-none">
          <h2 class="mb-2">${this.theType.name()}</h2>
          <div class="relative">
            <div class="${this.theId.value().primitive()} node-view select-none z-90">${unsafeHTML(template)}</div>
            <div class="absolute top-0 left-0 z-1 w-full select-none">${unsafeHTML(template)}</div>
          </div>
        </article>`;
  }
}
