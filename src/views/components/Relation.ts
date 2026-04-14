import { Connected, Context, Late, Lazy, Value } from 'silentium';
import { StateRecord, Switch, Task, Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';
import { Tr } from '@/io/Translation';
import { MapStream } from '@/models/MapStream';

type TheStates = 'waiting' | 'choosing' | 'next';

export function Relation(map: MapStream) {
  const mode$ = Late<TheStates>('waiting');
  const activeNodeEvent = map.activeNodeEvent();
  const activeNode = map.activeNode();
  const relation$ = StateRecord(mode$, activeNodeEvent, ['choosing', 'next']);
  const rSub = relation$.then((relation: any) => {
    activeNode.fromRelation(relation.choosing.id);
  });
  const mode = Value(mode$);
  const nodeEditBlock$ = Context<[string, boolean]>('node-edit-block-reasons');
  const modeSub = Task(mode$).then(v => {
    nodeEditBlock$.use(['relation', v !== 'waiting']);
  });
  const anSub = activeNodeEvent.then(() => {
    if (mode.value === 'next') {
      mode$.use('waiting');
    } else if (mode.value === 'choosing') {
      mode$.use('next');
    }
  });
  return Connected<string>(
    Template(
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
              'choosing',
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
            [
              'next',
              Lazy(() =>
                Button(
                  Tr('Next or cancel'),
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
    ),
    relation$,
    mode$,
    anSub,
    rSub,
    modeSub
  );
}
