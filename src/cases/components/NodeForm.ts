import {
  Applied,
  Connected,
  Filtered,
  Late,
  MessageType,
  Of,
  Primitive,
  SourceType,
  Value
} from 'silentium';
import { BranchLazy, Part, Path, Polling, Template } from 'silentium-components';
import { Checkbox, html, Input, Select } from 'silentium-ui';
import { Node } from '../../domain/Node';
import { NodeRelation } from '../../domain/NodeRelation';
import { MapModel } from '../../flows/MapModel';
import { Tr } from '../../io/Translation';
import { NodeRelations } from './NodeRelations';
import { NodeVariables } from './NodeVariables';

export function NodeForm(
  map: MapModel,
  saved$: MessageType<boolean>,
  done$: SourceType<object>
) {
  const url = Primitive(map.url());
  const local$ = Late<Node>();
  const activeNode = map.activeNode();
  const sub = activeNode.message().then(node => {
    local$.use({ ...node.data(), outlink: node.data().outlink || url.primitiveWithException() });
  });
  const typesList$ = Applied(map.nodeTypes(), types =>
    types.map(type => ({ _id: type.data().id, title: type.data().name }))
  );
  Polling(Of(Value(local$)), Filtered(saved$, Boolean)).then(object => {
    if (object.value) {
      activeNode.update(object.value);
      done$.use({});
    }
  });
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
                          ${t.raw(Input(Part<string>(local$, 'outlink', url.primitiveWithException() ?? '')))}
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
                ${t.raw(NodeVariables(Part(local$, 'additionalFields', {})))}
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
