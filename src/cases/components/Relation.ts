import { Switch, Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';
import { Tr } from '../../io/Translation';
import { Context, Late } from 'silentium';

export function Relation() {
  const mode$ = Late('waiting');
  const activeNodeId$ = Context('active-node-id');
  return Template(
    t =>
      html`<div class="mt-auto p-2">
        ${t.raw(
          Switch(mode$, [
            [
              'waiting',
              Button(Tr('Choose object'), 'btn w-full cursor-pointer', mode$, '', 'choosing'),
            ],
            [['choosing', 'next'], Button(Tr('Cancel'), 'btn w-full cursor-pointer', mode$, '', 'waiting')],
          ])
        )}
      </div>`
  );
}
