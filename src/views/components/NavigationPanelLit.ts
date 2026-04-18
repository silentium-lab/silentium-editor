import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Context } from 'silentium';
import logo from '@/assets/imgs/logo.svg';
import { MapEntity } from '@/models/MapEntity';

@customElement('navigation-panel-lit')
export class NavigationPanelLit extends LitElement {
  public createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  public map!: MapEntity;

  private onBack = () => {
    const mapName$ = Context('active-map-name');
    mapName$.use(this.map!.parent());
  }

  private onClose = () => {
    const appClosed$ = Context('app-closed');
    appClosed$.use(Date.now());
  }

  public render() {
    const showBack = !!(this.map && this.map.hasParent());
    return html`
      <div class="flex w-full justify-between">
        <div class="flex gap-2 justify-center items-center">
          <img src="${logo}" width="35" height="35" class="mx-auto" alt="" />
          <strong>SilentiumEditor</strong>
        </div>
        ${showBack
        ? html`<button class="ml-auto mr-2 underline" @click="${this.onBack}">Назад</button>`
        : html``}
        <button class="btn cursor-pointer" @click="${this.onClose}">&times;</button>
      </div>
    `;
  }
}
