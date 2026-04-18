import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MapEntity } from '@/models/MapEntity';

@customElement('settings-lit')
export class SettingsLit extends LitElement {
  createRenderRoot() { return this; }

  @property({ type: Object })
  map: MapEntity | null = null;

  render() {
    return html`<div class="settings-lit">SettingsLit</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-lit': SettingsLit;
  }
}
