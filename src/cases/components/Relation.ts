import { Connected, Context, Late, Lazy, MessageSourceType, Value } from 'silentium';
import { StateRecord, Switch, Task, Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';
import { TheMap } from '../../domain/Map';
import { Tr } from '../../io/Translation';

type TheStates = 'waiting' | 'choosing' | 'next';

export function Relation(map$: MessageSourceType<TheMap>) {
  const mode$ = Late<TheStates>('waiting');
  const activeNodeId$ = Context('active-node-id');
  const relation$ = StateRecord(mode$, activeNodeId$, ['choosing', 'next']);
  const map = Value(map$);
  relation$.then((relation: any) => {
    const object = Object.values(map.value.objects).find(object => object.id === relation.choosing.id);
    if (!object) {
      throw new Error(`Relation: object was not found ${relation.choosing.id}`);
    }
    if (object) {
      map$.use({
        ...map.value,
        objects: {
          ...map.value.objects,
          [object.id]: {
            ...object,
            arrows: [
              ...object.arrows,
              {
                id: relation.next.id,
                label: '',
              },
            ],
          },
        },
      });
    }
  });
  const mode = Value(mode$);
  const nodeEditBlock$ = Context<[string, boolean]>('node-edit-block-reasons');
  Task(mode$).then(v => {
    nodeEditBlock$.use(['relation', v !== 'waiting']);
  });
  activeNodeId$.then(() => {
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
    activeNodeId$,
    relation$,
    mode$
  );
}
