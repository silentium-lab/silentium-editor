import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Context } from 'silentium';
import logo from '@/assets/imgs/logo.svg';
import { MapEntity } from '@/models/MapEntity';

@customElement('navigation-panel-lit')
export class NavigationPanelLit extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  map: MapEntity | null = null;

  render() {
    const showBack = !!(this.map && this.map.hasParent());
    return html`
      <div class="flex w-full justify-between">
        <div class="flex gap-2 justify-center items-center">
          <img src="${logo}" width="35" height="35" class="mx-auto" alt="" />
          <strong>SilentiumEditor</strong>
        </div>
        ${showBack
        ? html`<button class="ml-auto mr-2 underline" @click="${() => {
          const mapName$ = Context('active-map-name');
          mapName$.use(this.map!.parent());
        }}">Назад</button>`
        : html``}
        <button class="btn" @click="${() => {
        const appClosed$ = Context('app-closed');
        appClosed$.use(Date.now());
      }}">&times;</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-panel-lit': NavigationPanelLit;
  }
}
