import { Applied, Computed, Connected, Context, Late, MessageType, Of, Value } from 'silentium';
import { HashTable, Polling, Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { Tr } from '../../io/Translation';
import { Modal } from './Modal';
import { MapModel } from '../../flows/MapModel';

export function NodeModal(nodeEditBlock$: MessageType<[string, boolean]>, mapModel: MapModel) {
  const nodeBlockRecord$ = HashTable(nodeEditBlock$);
  const isBlocked$ = Applied(nodeBlockRecord$, record =>
    Object.values(record).some(v => v === true)
  );
  const opened$ = Late(false);
  const activeNodeId$ = Context<{ id: string }>('active-node-id');
  const nodeEditBlock = Value(isBlocked$);
  activeNodeId$.then(e => {
    if (nodeEditBlock.value) {
      return;
    }
    opened$.use(true);
  });
  const deleted$ = Late();
  Polling(Of(Value(activeNodeId$)), deleted$).then((active) => {
    mapModel.object(active.value.id).delete();
    opened$.use(false);
  });

  const saved$ = Late();

  return Connected<string>(
    Mount(
      Modal(
        Tr('Map object'),
        Template(
          t =>
            html`<div>
              <div class="mb-2">Edit</div>
              <div class="mb-2">${t.escaped(Computed(JSON.stringify, activeNodeId$))}</div>
              <div class="mb-2 flex gap-2">
                ${t.raw(Button(Tr('Save'), 'btn text-base', saved$))}
                ${t.raw(Button(Tr('Delete'), 'btn bg-danger text-base', deleted$))}
              </div>
            </div>`
        ),
        opened$
      )
    ),
    activeNodeId$,
    deleted$
  );
}
