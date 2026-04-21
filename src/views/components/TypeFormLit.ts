import { Tr } from "@/io/Translation";
import { TheNodeType } from "@/types/NodeType";
import { Behave } from "@/views/controllers/Behave";
import { Observe } from "@/views/controllers/Observe";
import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Late, MessageSourceType, Value } from "silentium";
import { Part } from "silentium-components";

@customElement('type-form-lit')
export class TypeFormLit extends LitElement {
  @property({ type: Object })
  private type!: TheNodeType;

  private labels = {
    name: Observe(this, Tr('Name')),
    code: Observe(this, Tr('Code')),
    width: Observe(this, Tr('Width')),
    height: Observe(this, Tr('Height')),
  } as const;

  private fields: any = {};

  public connectedCallback(): void {
    super.connectedCallback();
    const local$ = Late(this.type);
    local$.then(v => {
      this.dispatchEvent(new CustomEvent('change', {
        detail: v
      }));
    })
    this.fields = {
      name: Behave(this, Part<string>(local$, 'name')),
      markup: Behave(this, Part<string>(local$, 'markup')),
      width: Behave(this, Part<string>(local$, 'width')),
      height: Behave(this, Part<string>(local$, 'height')),
    }
  }

  public render() {
    return html`<div>
          <div class="mb-2">
            <label>
              <b> ${this.labels.name.value} </b>
              <div class="block">
                <input type="text" name="name" .value="${this.fields.name.value}" @input="${this.fields.name.use}" />
              </div>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${this.labels.code.value} </b>
              <div>
              <textarea class="border-1 border-gray-300 bg-white p-2 rounded-sm w-full h-24" name="markup" @input="${this.fields.markup.use}">${this.fields.markup.value}</textarea>
              </div>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${this.labels.width.value} </b>
              <div>
                <input type="text" name="with" .value="${this.fields.width.value}" @input="${this.fields.width.use}" />
              </div>
            </label>
          </div>
          <div class="mb-4">
            <label>
              <b> ${this.labels.height.value} </b>
              <div>
                <input type="text" name="height" .value="${this.fields.height.value}" @input="${this.fields.height.use}" />
              </div>
            </label>
          </div>
        </div>`
  }
}
