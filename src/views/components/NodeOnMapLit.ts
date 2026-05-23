import { NodeBottomName } from "@/app/NodeBottomName";
import { NodeTemplate } from "@/app/NodeTemplate";
import { NodeTopName } from "@/app/NodeTopName";
import { $mapStore } from "@/store";
import { TheNode } from "@/types/Node";
import { Store } from "@/views/controllers/Store";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('node-on-modal-lit')
export class NodeOnMapLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  node!: TheNode;

  private map = new Store(this, $mapStore);

  render() {
    const type = this.map.value.types[this.node.type];
    return html`<div
          class="node-view flex flex-col items-center text-sm select-none absolute node-id-${this.node.id}"
          style="left: ${this.node.position[0]}px;top: ${this.node.position[1]}px;z-index: ${this.node.zindex}"
        >
          <span> ${NodeTopName(this.node)} </span>
          <div>
            ${NodeTemplate(this.node, type)}
          </div>
          <span> ${NodeBottomName(this.node)} </span>
        </div>`;
  }
}
