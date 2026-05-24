import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ruller-x-lit')
export class RullerXLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div
          class="absolute flex top-0 left-0 w-[3000px] ml-4 z-90 h-4 border-b bg-base text-right text-border text-sm px-2"
          style="transform: translate(0px, 0px);"
        >
          <span class="flex-1 text-body-dark">300px</span>
          <span class="flex-1 text-body-dark">600px</span>
          <span class="flex-1 text-body-dark">900px</span>
          <span class="flex-1 text-body-dark">1200px</span>
          <span class="flex-1 text-body-dark">1500px</span>
          <span class="flex-1 text-body-dark">1800px</span>
          <span class="flex-1 text-body-dark">2100px</span>
          <span class="flex-1 text-body-dark">2400px</span>
          <span class="flex-1 text-body-dark">2700px</span>
          <span class="flex-1 text-body-dark">3000px</span>
        </div>`;
  }
}
