import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DestroyContainer, MessageType } from 'silentium';

@customElement('modal-lit')
export class ModalLit extends LitElement {
  @property({ type: String })
  public title!: string;

  @state()
  public opened: boolean = false;

  @property({ type: Object })
  public openEvent!: MessageType;

  @property({ type: Object })
  public closeEvent!: MessageType;

  private dc = DestroyContainer();

  public connectedCallback() {
    super.connectedCallback();
    this.dc.add(
      this.openEvent.then(() => {
        this.opened = true;
      })
    );
    this.dc.add(
      this.closeEvent.then(() => {
        this.opened = false;
      })
    );
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.dc.destroy();
  }

  public createRenderRoot() {
    return this;
  }

  private preventClick(e: Event) {
    e.stopPropagation();
  }

  @property({ attribute: false }) public content?: TemplateResult;
  @property({ attribute: false }) public actions?: TemplateResult;

  private close() {
    this.opened = false;
  }

  public render() {
    return html`<div
      class="bg-black/50 inset-0 ${this.opened
        ? 'flex'
        : 'hidden'} fixed top-0 left-0 right-0 bottom-0 items-center justify-center p-4 z-100"
      @click="${this.close}"
    >
      <div
        @click="${this.preventClick}"
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col relative"
      >
        <button
          @click="${this.close}"
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
        <div class="px-6 py-4 border-b border-gray-400 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">${this.title}</h3>
        </div>
        <div class="px-6 py-4 overflow-y-auto flex-1">${this.content}</div>
        <div class="px-6 py-4 border-t border-gray-400 flex justify-between items-center">
          ${this.actions}
        </div>
      </div>
    </div>`;
  }
}
