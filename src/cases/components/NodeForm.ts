import { Applied, Connected, Late, MessageSourceType, MessageType, Of, Value } from 'silentium';
import { Part, Polling, Template } from 'silentium-components';
import { Checkbox, html, Input, Select } from 'silentium-ui';
import { TheNode } from '../../domain/Node';
import { Tr } from '../../io/Translation';
import { TheNodeType } from '../../domain/NodeType';
import { NodeRelations } from './NodeRelations';
import { TheNodeRelation } from '../../domain/NodeRelation';

export function NodeForm(
  object$: MessageSourceType<TheNode>,
  saved$: MessageType<boolean>,
  types$: MessageType<TheNodeType[]>
) {
  const local$ = Late<TheNode>();
  const sub = object$.then(type => {
    local$.use(type);
  });
  const typesList$ = Applied(types$, types =>
    types.map(type => ({ _id: type.id, title: type.name }))
  );

  Polling(Of(Value(local$)), saved$).then(object => {
    object$.use(object.value);
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
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Name top'))} </b>
              <span class="block"> ${t.raw(Input(Part<string>(local$, 'additionalName')))} </span>
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
                ${t.raw(NodeRelations(Part<TheNodeRelation[]>(local$, 'arrows')))}
              </span>
            </label>
          </div>
        </div>`
    ),
    sub
  );
}
