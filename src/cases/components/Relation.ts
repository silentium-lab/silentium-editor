import { Switch, Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';
import { Tr } from '../../io/Translation';
import { All, Context, Filtered, Late, Lazy } from 'silentium';

export function Relation() {
  const mode$ = Late('waiting');
  const activeNodeId$ = Context('active-node-id');
  activeNodeId$.then(v => {
    console.log('Handle new relation', activeNodeId$);
  });
  All(
    Filtered(mode$, mode => mode === 'choosing'),
    activeNodeId$
  ).then(() => {
    console.log('handling');
  });
  return Template(
    t =>
      html`<div class="mt-auto p-2">
        ${t.raw(
          Switch(mode$, [
            [
              'waiting',
              Lazy(() =>
                Button(Tr('Choose object'), 'btn w-full cursor-pointer', mode$, '', 'choosing')
              ),
            ],
            [
              ['choosing', 'next'],
              // TODO why Lazy required?
              Lazy(() =>
                Button(
                  Tr('Cancel'),
                  'btn w-full cursor-pointer bg-danger text-base',
                  mode$,
                  '',
                  'waiting'
                )
              ),
            ],
          ])
        )}
      </div>`
  );
}
