import { NodeBottomName } from "@/app/NodeBottomName";
import { NodeMove } from "@/app/NodeMove";
import { NodeTemplate } from "@/app/NodeTemplate";
import { NodeTopName } from "@/app/NodeTopName";
import { Draggable } from "@/io/Draggable";
import { $mapStore, mapDispatch } from "@/store";
import { TheNode } from "@/types/Node";
import { Observe } from "@/views/controllers/Observe";
import { Store } from "@/views/controllers/Store";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { DestroyContainer } from "silentium";
import { ClassName, Id } from "silentium-ui";
import { Element } from "silentium-web-api";

@customElement('node-on-modal-lit')
export class NodeOnMapLit extends LitElement {
  dc = DestroyContainer();
  elementId = Observe(this, Id());

  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  node!: TheNode;

  private map = new Store(this, $mapStore);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('class', `node-view flex flex-col items-center text-sm select-none absolute node-id-${this.node.id}`);
    this.classList.add(this.elementId.value);
    const container$ = Element(ClassName(this.elementId.source()));
    this.dc.add(container$);
    const draggable$ = Draggable(container$, {}, undefined, '.node-view');
    this.dc.add(draggable$);
    draggable$.then((position) => {
      mapDispatch(NodeMove(this.node, position));
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dc.destroy();
  }

  render() {
    const type = this.map.value.types[this.node.type];
    this.style.zIndex = this.node.zindex.toString();
    if (!this.style.left && !this.style.top) {
      this.style.transform = `translate(${this.node.position[0]}px, ${this.node.position[1]}px)`;
    } else {
      this.style.transform = `translate(0px, 0px)`
    }
    console.log(this.node.position);
    return html`<div>
          <span> ${NodeTopName(this.node)} </span>
          <div>
            ${unsafeHTML(NodeTemplate(this.node, type))}
          </div>
          <span> ${NodeBottomName(this.node)} </span>
        </div>`;
  }
}
