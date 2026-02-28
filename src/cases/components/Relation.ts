import { Context, Late, Lazy, MessageSourceType, ResetSilenceCache, Value } from 'silentium';
import { Path, StateRecord, Switch, Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';
import { Tr } from '../../io/Translation';
import { TheMap } from '../../domain/Map';

type TheStates = 'waiting' | 'choosing' | 'next';

export function Relation(map$: MessageSourceType<TheMap>) {
  const mode$ = Late<TheStates>('waiting');
  const activeNodeId$ = Context('active-node-id');
  const relation$ = StateRecord(mode$, Path(activeNodeId$, 'id'), ['choosing', 'next']);
  const map = Value(map$);
  relation$.then((relation: any) => {
    const object = Object.values(map.value.objects).find(object => object.id === relation.choosing);
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
                id: relation.next,
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
  mode$.then(v => {
    nodeEditBlock$.use(['relation', v !== 'waiting']);
  });
  activeNodeId$.then(() => {
    if (mode.value === 'next') {
      mode$.use('waiting');
    } else if (mode.value === 'choosing') {
      mode$.use('next');
    }
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
  );
}
