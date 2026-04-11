import {
  Applied,
  Connected,
  Context,
  Filtered,
  Late,
  MessageType,
  Of,
  SourceComputed,
  SourceType,
  Value,
} from 'silentium';
import { BranchLazy, Part, Path, Polling, Template } from 'silentium-components';
import { Checkbox, html, Input, Select } from 'silentium-ui';
import { Node } from '../../domain/Node';
import { NodeRelation } from '../../domain/NodeRelation';
import { NodeModel } from '../../flows/NodeModel';
import { Tr } from '../../io/Translation';
import { NodeRelations } from './NodeRelations';
import { NodeVariables } from './NodeVariables';

export function NodeForm(
  nodeModel: NodeModel,
  saved$: MessageType<boolean>,
  types$: MessageType<Node[]>,
  done$: SourceType<object>
) {
  const map$ = Context('map');
  const url = Value(Path<string>(map$, 'url'));
  const local$ = Late<Node>();
  const sub = nodeModel.message().then(type => {
    local$.use({ ...type, outlink: type.outlink || url.value });
  });
  const typesList$ = Applied(types$, types =>
    types.map(type => ({ _id: type.id, title: type.name }))
  );
  Polling(Of(Value(local$)), Filtered(saved$, Boolean)).then(object => {
    if (object.value) {
      nodeModel.update(object.value);
      done$.use({});
    }
  });
  const additionalFields$ = Part(local$, 'additionalFields', {});
  return Connected<string>(
    Template(
      t =>
        html`<div>
          <div class="mb-2">
            <label>
              <span class="block">
                ${t.raw(Checkbox(Tr('Name as link'), Part<boolean>(local$, 'linked')))}
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
                          ${t.raw(Input(Part<string>(local$, 'outlink', url.value ?? '')))}
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
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Variables'))} </b>
              <span class="block">
                ${t.raw(NodeVariables(SourceComputed(additionalFields$, additionalFields$)))}
              </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Name bottom'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'name')))} </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Description'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'description')))} </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Z-index'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'zindex')))} </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Width'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'width')))} </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Height'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'height')))} </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Object type'))} </b>
              <span class="block">
                ${t.raw(Select(Part<string>(local$, 'type'), typesList$))}
              </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Relations'))} </b>
              <span class="block">
                ${t.raw(NodeRelations(Part<NodeRelation[]>(local$, 'arrows')))}
              </span>
            </label>
          </div>
        </div>`
    ),
    sub
  );
}
