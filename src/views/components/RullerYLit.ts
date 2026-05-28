import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ruller-y-lit')
export class RullerYLit extends LitElement {
  @property({ type: Object })
  dragPosition = { x: 0, y: 0 };

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div
      class="absolute flex [writing-mode:vertical-lr] top-0 left-0 h-[3000px] border-r bg-base text-border z-20 w-4 text-right text-sm/0 py-2"
      style="transform: translate(0px, ${this.dragPosition.y * -1}px);"
    >
      <span class="flex-1 text-body-dark">300px</span
      ><span class="flex-1 text-body-dark">600px</span
      ><span class="flex-1 text-body-dark">900px</span
      ><span class="flex-1 text-body-dark">1200px</span
      ><span class="flex-1 text-body-dark">1500px</span
      ><span class="flex-1 text-body-dark">1800px</span
      ><span class="flex-1 text-body-dark">2100px</span
      ><span class="flex-1 text-body-dark">2400px</span
      ><span class="flex-1 text-body-dark">2700px</span
      ><span class="flex-1 text-body-dark">3000px</span>
    </div>`;
  }
}
