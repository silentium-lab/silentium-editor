import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('modal-lit')
export class ModalLit extends LitElement {
  @property({ type: String })
  public title!: string;

  @property({ type: Boolean })
  public opened!: boolean;

  public createRenderRoot() {
    return this;
  }

  public render() {
    return html`<div
          class="bg-black/50 inset-0 ${this.opened ? 'flex' : 'none'} items-center justify-center p-4 z-50"
        >
          <div
            class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col relative"
          >
            <button
              class="top-2 right-2 absolute cursor-pointer text-gray-400 hover:text-gray-600"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div
              class="px-6 py-4 border-b border-gray-400 flex justify-between items-center"
            >
              <h3 class="text-lg font-semibold text-gray-900">${this.title}</h3>
            </div>
            <div class="px-6 py-4 overflow-y-auto flex-1">
              <slot></slot>
            </div>
            <div
                class="px-6 py-4 border-t border-gray-400 flex justify-between items-center"
              >
                <slot name="actions"></slot>
              </div>
          </div>
        </div>`;
  }
}
