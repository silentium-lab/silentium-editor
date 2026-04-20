import { Tr } from "@/io/Translation";
import { TheNodeType } from "@/types/NodeType";
import { Behave } from "@/views/controllers/Behave";
import { Observe } from "@/views/controllers/Observe";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MessageSourceType } from "silentium";
import { Part } from "silentium-components";

@customElement('type-form-lit')
export class TypeFormLit extends LitElement {
  @property({ type: Object })
  private typeLocal$!: MessageSourceType<TheNodeType>;

  private labels = {
    name: Observe(this, Tr('Name')),
    code: Observe(this, Tr('Code')),
    width: Observe(this, Tr('Width')),
    height: Observe(this, Tr('Height')),
  } as const;

  private name$ = Behave(this, Part<string>(this.typeLocal$, 'name'));
  private markup$ = Behave(this, Part<string>(this.typeLocal$, 'markup'));
  private width$ = Behave(this, Part<string>(this.typeLocal$, 'width'));
  private height$ = Behave(this, Part<string>(this.typeLocal$, 'height'));

  public render() {
    return html`<div>
          <div class="mb-2">
            <label>
              <b> ${this.labels.name.value} </b>
              <span class="block">
                <input type="text" name="name" .value="${this.name$.value}" @input="${this.name$.use}" />
              </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${this.labels.code.value} </b>
              <textarea class="border-1 border-gray-300 bg-white p-2 rounded-sm w-full h-24" name="markup" @input="${this.markup$.use}">${this.markup$.value}</textarea>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${this.labels.width.value} </b>
              <input type="text" name="with" .value="${this.width$.value}" @input="${this.width$.use}" />
            </label>
          </div>
          <div class="mb-4">
            <label>
              <b> ${this.labels.height.value} </b>
              <input type="text" name="height" .value="${this.height$.value}" @input="${this.height$.use}" />
            </label>
          </div>
        </div>`
  }
}
