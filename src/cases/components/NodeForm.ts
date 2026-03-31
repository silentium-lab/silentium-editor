import { Connected, Late, MessageSourceType, MessageType, Of, Value } from 'silentium';
import { Part, Polling, Template } from 'silentium-components';
import { Checkbox, html, Input } from 'silentium-ui';
import { TheNode } from '../../domain/Node';
import { Tr } from '../../io/Translation';

export function NodeForm(object$: MessageSourceType<TheNode>, saved$: MessageType<boolean>) {
  const local$ = Late<TheNode>();
  const sub = object$.then(type => {
    local$.use(type);
  });

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
        </div>`
    ),
    sub
  );
}
