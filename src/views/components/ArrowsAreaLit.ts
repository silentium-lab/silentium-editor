import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ClassName, Id } from 'silentium-ui';
import { Store } from "@/views/controllers/Store";
import { Observe } from '@/views/controllers/Observe';
import { DestroyContainer, Of } from 'silentium';
import { Element } from 'silentium-web-api';

@customElement('arrows-area-lit')
export class ArrowsAreaLit extends LitElement {
  @property({type: Object})
  dragPosition = {x: 0, y: 0}

  public createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="arrows-area z-10"></div>`;
  }
}
