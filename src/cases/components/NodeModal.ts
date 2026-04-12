import { Applied, Connected, Context, Late, Of, Primitive, Value } from 'silentium';
import { BranchLazy, Path, Polling, Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { MapModel } from '@/flows/MapModel';
import { Tr } from '@/io/Translation';
import { DateReadable } from '@/cases/formats/DateReadable';
import { Modal } from './Modal';
import { NodeForm } from './NodeForm';

export function NodeModal(map: MapModel) {
  const opened$ = Late(false);
  const activeNodeId$ = Context<{ id: string }>('active-node-id');
  const nodeEditBlock = Value(map.isNodeEditBlocked());
  activeNodeId$.then(() => {
    if (nodeEditBlock.value) {
      return;
    }
    opened$.use(true);
  });
  const deleted$ = Late();
  Polling(Of(Primitive(activeNodeId$)), deleted$).then(active => {
    map.node(active.primitiveWithException().id).delete();
    opened$.use(false);
  });
  const saved$ = Late<boolean>(false);
  const activeObject = map.activeNode();
  const activeObject$ = Applied(activeObject.message(), (o) => o.data());
  const saveDone$ = Late<object>();
  saveDone$.then(() => {
    opened$.use(false);
    saved$.use(false);
  });
  return Connected<string>(
    Mount(
      Modal(
        Template(t => `${t.escaped(Tr('Map object'))} #${t.escaped(Path(activeNodeId$, 'id'))}`),
        Template(
          t =>
            html`<div>
              <div class="mb-2">
                <b>
                  ${t.escaped(Tr('Creation date'))}:
                  ${t.escaped(DateReadable(Path(activeObject$, 'createTimestamp')))}
                </b>
              </div>
              <div class="mb-2">
                <b>
                  ${t.escaped(Tr('Update date'))}:
                  ${t.escaped(DateReadable(Path(activeObject$, 'changeTimestamp')))}
                </b>
              </div>
              <div class="mb-2">
                ${t.raw(
              BranchLazy(
                opened$,
                () => NodeForm(map, saved$, saveDone$),
                () => Of('-')
              )
            )}
              </div>
            </div>`
        ),
        opened$,
        Template(
          t =>
            html`<div class="flex gap-2">
              ${t.raw(Button(Tr('Save'), 'btn', saved$))}
              ${t.raw(Button(Tr('Delete'), 'btn bg-danger text-base', deleted$))}
            </div>`
        )
      )
    ),
    activeNodeId$,
    activeObject$,
    deleted$
  );
}
