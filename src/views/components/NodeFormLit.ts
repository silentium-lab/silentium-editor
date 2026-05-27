import { tr, Tr } from '@/io/Translation';
import { TheNode } from '@/types/Node';
import '@/views/components/CheckboxLit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import invariant from 'ts-invariant';

@customElement('node-form-lit')
export class NodeFormLit extends LitElement {
    createRenderRoot() {
        return this;
    }

    @property({ type: Object })
    node!: TheNode;

    private handle = (pair: CustomEvent) => {
        invariant(pair.detail !== undefined, 'TypeFormLit: pair comes with undefined detail!')
        this.dispatchEvent(
            new CustomEvent('custom-change', {
                detail: {
                    ...this.node,
                    [pair.detail[0]]: pair.detail[1]
                },
            })
        );
    };

    render() {
        return html`<div>
          <div class="mb-2">
            <label>
              <span class="block">
                <checkbox-lit .label="${tr('Name as link')}" .val="${this.node.linked}" field="linked"></checkbox-lit>
              </span>
            </label>
          </div>
          ${t.raw(
            BranchLazy(
                Path(local$, 'linked'),
                () =>
                    Template(
                        t =>
                            html`<div id="link" class="mb-2">
                      <label>
                        <span class="block">
                          ${t.raw(
                                Input(
                                    Part<string>(local$, 'outlink', url.primitiveWithException() ?? '')
                                )
                            )}
                        </span>
                      </label>
                    </div>`
                    ),
                () => Of('')
            )
        )}
          <div id="name" class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Name top'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'additionalName')))} </span>
            </label>
          </div>
          <div id="variables" class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Variables'))} </b>
              <span class="block">
                ${t.raw(
            NodeVariables(
                SourceComputed<Record<string, string>>(
                    Getter(activeNode.message(), 'additionalFields'),
                    additionalFields$
                )
            )
        )}
              </span>
            </label>
          </div>
          <div id="bottom-name" class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Name bottom'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'name')))} </span>
            </label>
          </div>
          <div id="description" class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Description'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'description')))} </span>
            </label>
          </div>
          <div id="zindex" class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Z-index'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'zindex')))} </span>
            </label>
          </div>
          <div id="width" class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Width'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'width')))} </span>
            </label>
          </div>
          <div id="height" class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Height'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'height')))} </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Object type'))} </b>
              <span class="block">
                ${t.raw(
            Select(
                SourceComputed(
                    Getter(activeNode.message(), 'typeId'),
                    Part<string>(local$, 'type')
                ),
                typesList$
            )
        )}
              </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Relations'))} </b>
              <span class="block">
                ${t.raw(NodeRelations(Part<TheNodeRelation[]>(local$, 'arrows')))}
              </span>
            </label>
          </div>
        </div>`;
    }
}
